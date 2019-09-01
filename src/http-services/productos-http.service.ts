import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootHttpService } from 'src/http-services/root-http.service';
import { Producto } from 'src/modelo/Producto';
import { FiltrosProductos } from 'src/app/compartido/filtros-productos/filtros-productos.component';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductosHttpService extends RootHttpService {

  protected baseURI = this.baseURI + '/gestion/productos';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public listarProductosFiltrados(filtros: FiltrosProductos): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      this.baseURI,
      this.parametrosHttp(filtros)
    ).pipe(
      retry(2)
    );
  }

  public listarProductosByTipo(idTipo: number): Observable<Producto[]> {
    return this.listarProductosFiltrados({
      tipo: idTipo
    });
  }

  public listarProductosByFamilia(idFamilia: number): Observable<Producto[]> {
    return this.listarProductosFiltrados({
      familia: idFamilia
    });
  }

  public guardarProducto(prod: Producto): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      prod
    );
  }

  public borrarProducto(idProducto: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idProducto
    );
  }
}
