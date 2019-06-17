import { Injectable } from '@angular/core';
import { RootHttpService } from './root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sesion } from 'src/models/Sesion';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends RootHttpService {

  protected baseURI = this.baseURI + "/gestion/sesiones";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public abrirSesion(details: any): Observable<Sesion> {
    return this.http.post<Sesion>(this.baseURI + "/abrir", details);
  }

  public validarSesion(ssn: Sesion): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/validar", ssn);
  }

  public cerrarSesion(ssn: Sesion): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/cerrar", ssn);
  }
}
