import { Injectable } from '@angular/core';
import { RootHttpService } from './root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService extends RootHttpService {

  protected baseURI = this.baseURI + "/gestion/auth";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public abrirSesion(): Observable<boolean> {
    return this.http.get<boolean>(this.baseURI + "/abrir");
  }

  public validarSesion(usr: Usuario): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/validar", usr);
  }

  public cerrarSesion(usr: Usuario): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/cerrar", usr);
  }
}
