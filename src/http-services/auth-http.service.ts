import { Injectable } from '@angular/core';
import { RootHttpService } from './root-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from 'src/models/Sesion';
import { Persona } from 'src/models/Persona';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthHttpService extends RootHttpService {

  protected baseURI = this.baseURI + '/sesiones';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public abrirSesion(details: any): Observable<Sesion> {
    return this.http.post<Sesion>(
      this.baseURI + '/abrir',
      details
    );
  }

  public validarSesion(ssn: Sesion): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/validar',
      ssn
    );
  }

  public obtenerDatosPersonaSesion(ssn: Sesion): Observable<Persona> {
    return this.http.get<Persona>(
      this.baseURI + '/perfil/obtener',
      this.parametrosHttp({
        sesion: ssn.hashSesion
      })
    ).pipe(
      retry(2)
    );
  }

  public actualizarPerfil(usr: Persona): Observable<number> {
    return this.http.put<number>(
      this.baseURI + '/perfil/actualizar',
      usr
    );
  }

  public cerrarSesion(ssn: Sesion): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/cerrar',
      ssn
    );
  }
}
