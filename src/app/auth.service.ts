import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthDataService } from 'src/data/auth.data.iservice';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';
import { Sesion } from 'src/models/entities/Sesion';
import { GESTION_ROUTES_AUTH } from './gestion/gestion.routes.auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  protected cambioSesionSource: Subject<Sesion>;
  protected validandoSesionSource: Subject<boolean>;

  public cambioSesion$: Observable<Sesion>;
  public validandoSesion$: Observable<boolean>;

  public get sesion(): Sesion {
    const ssnJSON: string = sessionStorage.getItem('sesion');
    if (ssnJSON) {
      return this.JSONToSesion(ssnJSON);
    } else {
      return null;
    }
  }
  public set sesion(ssn: Sesion) {
    if (!ssn) {
      sessionStorage.removeItem('sesion');
      this.cambioSesionSource.next(null);
    } else if (this.isSesionValida(ssn)) {
      const ssnJSON: string = JSON.stringify(ssn);
      sessionStorage.setItem('sesion', ssnJSON);
      this.cambioSesionSource.next(ssn);
    }
  }

  constructor(
    @Inject(DATA_SERVICE_ALIASES.auth) protected authDataService: AuthDataService,
  ) {
    const ssn = this.sesion;
    this.cambioSesionSource = new BehaviorSubject(ssn);
    this.validarSesion();
    this.cambioSesion$ = this.cambioSesionSource.asObservable();
  }

  public puedeVerModulo(nombreModulo: string): boolean {

    if (this.sesion) {
      const cargosAutorizados = GESTION_ROUTES_AUTH[nombreModulo];
      if (cargosAutorizados) {
        const puede = cargosAutorizados.includes(this.sesion.idCargo);
        return puede;
      }
    }
    return false;
  }

  protected JSONToSesion(json: string): Sesion {
    const userActualParse: Sesion = JSON.parse(json);
    if (userActualParse) {
      return userActualParse;
    } else {
      return null;
    }
  }

  public isSesionValida(ssn: Sesion): boolean {
    return !!ssn.hashSesion && !!ssn.idUsuario;
  }

  /**
   * Rutina de validación sencilla.
   */
  public validarSesion(): Observable<boolean> | boolean {
    if (this.validandoSesionSource) {
      this.validandoSesionSource.next(true);
    } else {
      this.validandoSesionSource = new BehaviorSubject(true);
      this.validandoSesion$ = this.validandoSesionSource.asObservable();
    }

    const ssn = this.sesion;
    if (ssn) {
      const obs: Observable<boolean> = this.authDataService.validarSesion(ssn);
      obs.pipe(
        finalize(() => { this.validandoSesionSource.next(false); })
      ).subscribe(
        (validada: boolean) => {
          if (validada) {
            this.sesion = ssn;
          } else {
            this.sesion = null;
          }
        },
        err => {
          this.sesion = null;
        }
      );
      return obs;
    } else {
      this.sesion = ssn;
      return false;
    }
  }

}
