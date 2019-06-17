import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sesion } from 'src/models/Sesion';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _changeSesion$: Observable<Sesion>;

  constructor() { 
    this._changeSesion$ = of(null);
    this.validarSesion();
  }

  public get sesionCambia(): Observable<Sesion> { return this._changeSesion$; }
  
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
      this._changeSesion$ = of(null);
    } else if (this.isSesionValida(ssn)) {
      const ssnJSON: string = JSON.stringify(ssn);
      sessionStorage.setItem("sesion", ssnJSON);
      this._changeSesion$ = of(ssn);
    }
  }

  private JSONToSesion(json: string): Sesion {
    const userActualParse: Sesion = JSON.parse(json);
    if (userActualParse) {
      return userActualParse;
    } else {
      return null;
    }
  }

  public isSesionValida(ssn: Sesion): boolean {
    return !!ssn.idSesion && !!ssn.hashSesion && !!ssn.idUsuario;
  }

  /**
   * Rutina de validación sencilla.
   */
  public validarSesion() {
    const ssn = this.sesion;
    this.sesion = ssn;
  }
}
