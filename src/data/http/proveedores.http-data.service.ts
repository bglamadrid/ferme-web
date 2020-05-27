import { Injectable } from '@angular/core';
import { HttpService } from 'src/data/http/http.abstract-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/models/Proveedor';
import { retry, map } from 'rxjs/operators';
import { EntityDataService } from '../entity.data.iservice';

@Injectable()
export class ProveedoresHttpDataService
  extends HttpService
  implements EntityDataService<Proveedor> {

  protected baseURI = this.baseURI + '/gestion/proveedores';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Proveedor[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Proveedor, id: string | number): Observable<Proveedor> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public create(prov: Proveedor): Observable<Proveedor> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      prov
    ).pipe(
      map(id => {
        prov.idProveedor = id;
        return prov;
      })
    );
  }

  public deleteById(idProveedor: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idProveedor
    );
  }
}
