import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Persona } from 'src/models/Persona';
import { Sesion } from 'src/models/entities/Sesion';
import { AuthDataService } from '../auth.data.iservice';
import { CargosEnum } from 'src/enums/CargosEnum';

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
      id: this.latestSessionId,
      fechaAbiertaSesion: Date.now().toLocaleString(),
      hashSesion: 'test',
      idUsuario: 1,
      idEmpleado: 1,
      idCargo: CargosEnum.Administrador
    };

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
