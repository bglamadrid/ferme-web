import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosHttpService extends RootHttpService {

  protected baseURI = this.baseURI + "/gestion/usuarios";

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  public listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseURI);
  }

  public guardarUsuario(emp: Usuario): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", emp);
  }

  public borrarUsuario(idUsuario: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idUsuario);
  }
}
