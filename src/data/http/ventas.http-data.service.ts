import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/data/http/http.abstract-service';
import { Venta } from 'src/models/Venta';
import { DetalleVenta } from 'src/models/DetalleVenta';
import { retry, map } from 'rxjs/operators';
import { CompositeEntityDataService } from '../composite-entity.data.iservice';

@Injectable()
export class VentasHttpDataService
  extends HttpService
  implements CompositeEntityDataService<Venta, DetalleVenta> {

  protected baseURI = this.baseURI + '/gestion/ventas';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Venta> {
    throw new Error('Method not implemented.');
  }
  readFiltered(f: any): Observable<Venta[]> {
    throw new Error('Method not implemented.');
  }
  update(emp: Venta, id: string | number): Observable<Venta> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public readDetailsById(id: number): Observable<DetalleVenta[]> {
    return this.http.post<DetalleVenta[]>(
      this.baseURI + '/detalles',
      id
    );
  }

  public create(vt: Venta): Observable<Venta> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      vt
    ).pipe(
      map(id => {
        vt.idVenta = id;
        return vt;
      })
    );
  }

  public deleteById(idVenta: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idVenta
    );
  }
}
