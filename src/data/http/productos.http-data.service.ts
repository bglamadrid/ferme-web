import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from 'src/data/http/http.abstract-service';
import { Producto } from 'src/models/Producto';
import { FiltrosProductos } from 'src/app/shared/filtros-productos-panel/filtros-productos-panel.component';
import { retry, map } from 'rxjs/operators';
import { EntityDataService } from '../entity.data.iservice';

@Injectable()
export class ProductosHttpDataService
  extends HttpService
  implements EntityDataService<Producto> {

  protected baseURI = this.baseURI + '/gestion/productos';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }
  readById(id: string | number): Observable<Producto> {
    throw new Error('Method not implemented.');
  }
  update(emp: Producto, id: string | number): Observable<Producto> {
    throw new Error('Method not implemented.');
  }

  public readAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public readFiltered(filtros: FiltrosProductos): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      this.baseURI,
      this.parametrosHttp(filtros)
    ).pipe(
      retry(2)
    );
  }

  public readByTypeId(idTipo: number): Observable<Producto[]> {
    return this.readFiltered({
      tipo: idTipo
    });
  }

  public readByFamilyId(idFamilia: number): Observable<Producto[]> {
    return this.readFiltered({
      familia: idFamilia
    });
  }

  public create(prod: Producto): Observable<Producto> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      prod
    ).pipe(
      map(id => {
        prod.idProducto = id;
        return prod;
      })
    );
  }

  public deleteById(idProducto: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idProducto
    );
  }
}
