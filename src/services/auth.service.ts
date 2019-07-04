import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Sesion } from 'src/modelo/Sesion';
import { MatSnackBar } from '@angular/material';
import { AuthHttpService } from 'src/http-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected _changeSesionSource = new Subject<Sesion>();
  protected _changeSesion$: Observable<Sesion> = this._changeSesionSource.asObservable();

  constructor(
    protected authHttpSvc: AuthHttpService
  ) { 
    this._changeSesion$ = of(null);
    this.validarSesion();
  }

  public get sesionCambiada(): Observable<Sesion> { return this._changeSesion$; }
  
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
      this._changeSesionSource.next(null);
    } else if (this.isSesionValida(ssn)) {      
      const ssnJSON: string = JSON.stringify(ssn);
      sessionStorage.setItem("sesion", ssnJSON);
      this._changeSesionSource.next(ssn);
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
        }
      );
      return obs;
    } else {
      this.sesion = ssn;
      return false;
    }
  }
}
