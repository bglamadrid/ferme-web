import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootHttpService } from 'src/http-services/root-http.service';
import { OrdenCompra } from 'src/models/OrdenCompra';
import { DetalleOrdenCompra } from 'src/models/DetalleOrdenCompra';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrdenesCompraHttpService extends RootHttpService {

  protected baseURI = this.baseURI + '/gestion/ordenes_compra';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public listarOrdenesCompra(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(
      this.baseURI
    ).pipe(
      retry(2)
    );
  }

  public listarDetalles(ordenCompra: OrdenCompra): Observable<DetalleOrdenCompra[]> {
    return this.http.post<DetalleOrdenCompra[]>(
      this.baseURI + '/detalles',
      ordenCompra
    );
  }

  public guardarOrdenCompra(oc: OrdenCompra): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/guardar',
      oc
    );
  }

  public borrarOrdenCompra(idOrdenCompra: number): Observable<boolean> {
    return this.http.post<boolean>(
      this.baseURI + '/borrar',
      idOrdenCompra
    );
  }
}
