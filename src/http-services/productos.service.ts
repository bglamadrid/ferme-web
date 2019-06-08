import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  public guardarProducto(prod: Producto): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", prod);
  }

  public borrarProducto(idProducto: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idProducto);
  }
}
