import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootHttpService } from 'src/http-services/root.service';
import { Producto } from 'src/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosHttpService extends RootHttpService {

  protected baseURI = this.baseURI + "/gestion/productos";

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public listarProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseURI);
  }

  public listarProductosByTipo(idTipo: number): Observable<Producto[]> {
    return this.listarProductosByFilters({ tipo: idTipo });
  }

  public listarProductosByFamilia(idFamilia: number): Observable<Producto[]> {
    return this.listarProductosByFilters({ familia: idFamilia });
  }

  public listarProductosByFilters(filtros: any): Observable<Producto[]> {
    let queryParams: HttpParams = new HttpParams();
    for (const key in filtros) {
      if (filtros.hasOwnProperty(key)) {
        const element = filtros[key];
        queryParams = queryParams.append(key, String(element));
      }
    }
    return this.http.get<Producto[]>(this.baseURI, { params: queryParams });
  }

  public guardarProducto(prod: Producto): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", prod);
  }

  public borrarProducto(idProducto: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idProducto);
  }
}
