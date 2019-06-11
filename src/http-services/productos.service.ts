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
    const queryParams: HttpParams = new HttpParams().append("tipo", String(idTipo));
    return this.http.get<Producto[]>(this.baseURI, { params: queryParams });
  }

  public listarProductosByFamilia(idFamilia: number): Observable<Producto[]> {
    const queryParams: HttpParams = new HttpParams().append("familia", String(idFamilia));
    return this.http.get<Producto[]>(this.baseURI, { params: queryParams });
  }

  public guardarProducto(prod: Producto): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", prod);
  }

  public borrarProducto(idProducto: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idProducto);
  }
}
