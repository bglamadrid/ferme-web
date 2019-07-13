import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Sesion } from 'src/modelo/Sesion';
import { MatSnackBar } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected _cambioSesion$: Subject<Sesion>;
  protected cambioSesion$: Observable<Sesion>;

  protected _validandoSesion$: Subject<boolean>;
  protected validandoSesion$: Observable<boolean>;

  constructor(
    protected authHttpSvc: AuthHttpService
  ) { 
    const ssn = this.sesion;
    this._cambioSesion$ = new BehaviorSubject<Sesion>(ssn);
    this.validarSesion();
    this.cambioSesion$ = this._cambioSesion$.asObservable();
  }

  public get cambioSesion(): Observable<Sesion> { return this.cambioSesion$; }
  public get validandoSesion(): Observable<boolean> { return this.validandoSesion$; }
  
  public get sesion(): Sesion {
    const ssnJSON: string = sessionStorage.getItem("sesion");
    if (ssnJSON) {
      return this.JSONToSesion(ssnJSON);
    } else {
      return null;
    }
  }

  public set sesion(ssn: Sesion) {
    if (!ssn) {
      sessionStorage.removeItem("sesion");
      this._cambioSesion$.next(null);
    } else if (this.isSesionValida(ssn)) {      
      const ssnJSON: string = JSON.stringify(ssn);
      sessionStorage.setItem("sesion", ssnJSON);
      this._cambioSesion$.next(ssn);
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
    if (this._validandoSesion$) { 
      this._validandoSesion$.next(true);
    } else {
      this._validandoSesion$ = new BehaviorSubject<boolean>(true);
      this.validandoSesion$ = this._validandoSesion$.asObservable();
    }
    
    const ssn = this.sesion;
    if (ssn) {
      const obs: Observable<boolean> = this.authHttpSvc.validarSesion(ssn);
      obs.subscribe(
        (validada: boolean) => {
          if (validada) {
            this.sesion = ssn;
          } else {
            this.sesion = null;
          }
        },
        err => {
          this.sesion = null;
        },
        () => {
          this._validandoSesion$.next(false);
        }
      );
      return obs;
    } else {
      this.sesion = ssn;
      return false;
    }
  }
}
