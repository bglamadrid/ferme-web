import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/data/http/http.abstract-service';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { DetalleOrdenCompra } from 'src/models/DetalleOrdenCompra';
import { retry, map } from 'rxjs/operators';
import { EntityDataService } from '../entity.data.iservice';
import { CompositeEntityDataService } from '../composite-entity.data.iservice';

@Injectable()
export class OrdenesCompraHttpDataService
  extends HttpService
  implements CompositeEntityDataService<OrdenCompra, DetalleOrdenCompra> {

  protected baseURI = this.baseURI + '/gestion/ordenes_compra';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<OrdenCompra> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<OrdenCompra[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: OrdenCompra, id: string | number): Observable<OrdenCompra> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public readDetailsById(id: number): Observable<DetalleOrdenCompra[]> {
    return this.http.post<DetalleOrdenCompra[]>(
      this.baseURI + '/detalles',
      id
    );
  }

  public create(oc: OrdenCompra): Observable<OrdenCompra> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      oc
    ).pipe(
      map(id => {
        oc.idOrdenCompra = id;
        return oc;
      })
    );
  }

  public deleteById(idOrdenCompra: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idOrdenCompra
    );
  }
}
