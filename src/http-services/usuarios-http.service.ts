import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/Usuario';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsuariosHttpService extends RootHttpService {

  protected baseURI = this.baseURI + '/gestion/usuarios';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public listarUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public guardarUsuario(emp: Usuario): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      emp
    );
  }

  public borrarUsuario(idUsuario: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idUsuario
    );
  }
}
