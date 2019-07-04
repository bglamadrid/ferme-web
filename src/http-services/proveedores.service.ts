import { Injectable } from '@angular/core';
import { RootHttpService } from 'src/http-services/root.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/modelo/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresHttpService extends RootHttpService {

  protected baseURI = this.baseURI + "/gestion/proveedores";

  constructor(
    protected http: HttpClient
  ) { 
    super();
  }

  public listarProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.baseURI);
  }

  public guardarProveedor(emp: Proveedor): Observable<number> {
    return this.http.post<number>(this.baseURI + "/guardar", emp);
  }

  public borrarProveedor(idProveedor: number): Observable<boolean> {
    return this.http.post<boolean>(this.baseURI + "/borrar", idProveedor);
  }
}
