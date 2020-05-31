import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Sesion } from 'src/models/entities/Sesion';
import { AuthHttpDataService } from 'src/data/http/auth.http-data.service';
import { finalize } from 'rxjs/operators';
import { DATA_SERVICE_ALIASES } from 'src/data/data.service-aliases';

@Injectable({ providedIn: 'root' })
export class AuthService {

  protected cambioSesionSource: Subject<Sesion>;
  protected cambioSesion$: Observable<Sesion>;

  protected validandoSesionSource: Subject<boolean>;
  protected validandoSesion$: Observable<boolean>;

  constructor(
    @Inject(DATA_SERVICE_ALIASES.auth) protected authHttpSvc: AuthHttpDataService,
  ) {
    const ssn = this.sesion;
    this.cambioSesionSource = new BehaviorSubject(ssn);
    this.validarSesion();
    this.cambioSesion$ = this.cambioSesionSource.asObservable();
  }

  public get cambioSesion(): Observable<Sesion> { return this.cambioSesion$; }
  public get validandoSesion(): Observable<boolean> { return this.validandoSesion$; }

  public get sesion(): Sesion {
    const ssnJSON: string = sessionStorage.getItem('sesion');
    if (ssnJSON) {
      return this.JSONToSesion(ssnJSON);
    } else {
      return null;
    }
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
      const obs: Observable<boolean> = this.authHttpSvc.validarSesion(ssn);
      obs.pipe(
        finalize(() => { this.validandoSesionSource.next(false); })
      ).subscribe(
        (validada: boolean) => {
          if (validada) {
            this.Sesion = ssn;
          } else {
            this.Sesion = null;
          }
        },
        err => {
          this.Sesion = null;
        }
      );
      return obs;
    } else {
      this.Sesion = ssn;
      return false;
    }
  }


  public set Sesion(ssn: Sesion) {
    if (!ssn) {
      sessionStorage.removeItem('sesion');
      this.cambioSesionSource.next(null);
    } else if (this.isSesionValida(ssn)) {
      const ssnJSON: string = JSON.stringify(ssn);
      sessionStorage.setItem('sesion', ssnJSON);
      this.cambioSesionSource.next(ssn);
    }
  }

}
