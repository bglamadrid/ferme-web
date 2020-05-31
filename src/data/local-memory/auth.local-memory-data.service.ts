import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Persona } from 'src/models/entities/Persona';
import { Sesion } from 'src/models/entities/Sesion';
import { AuthDataService } from '../auth.data.iservice';

@Injectable()
export class AuthLocalMemoryDataService
  implements AuthDataService {

  protected latestSessionId: number;

  constructor() {
    this.latestSessionId = 0;
  }

  public abrirSesion(details: any): Observable<Partial<Sesion>> {
    this.latestSessionId++;

    const sesion: Partial<Sesion> = {
      idSesion: this.latestSessionId,
      fechaAbiertaSesion: Date.now().toLocaleString(),
      hashSesion: '',
      idUsuario: 0,
    }

    return of(sesion);
  }

  public validarSesion(ssn: Partial<Sesion>): Observable<boolean> {
    return of(null);
  }

  public obtenerDatosPersonaSesion(ssn: Sesion): Observable<Persona> {
    return of(null);
  }

  public actualizarPerfil(usr: Persona): Observable<number> {
    return of(0);
  }

  public cerrarSesion(ssn: Partial<Sesion>): Observable<boolean> {
    return of(true);
  }
}
