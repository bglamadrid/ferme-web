import { Injectable } from '@angular/core';
import { HttpService } from 'src/data/http/http.abstract-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/models/entities/Usuario';
import { retry, map } from 'rxjs/operators';
import { EntityDataService } from '../entity.data.iservice';

@Injectable()
export class UsuariosHttpDataService
  extends HttpService
  implements EntityDataService<Usuario> {

  protected baseURI = this.baseURI + '/gestion/usuarios';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Usuario> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Usuario[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Usuario, id: string | number): Observable<Usuario> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(usr: Usuario): Observable<Usuario> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      usr
    ).pipe(
      map(id => {
        usr.id = id;
        return usr;
      })
    );
  }

  public deleteById(idUsuario: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idUsuario
    );
  }
}
