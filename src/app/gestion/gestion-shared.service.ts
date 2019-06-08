import { Injectable } from '@angular/core';
import { RootHttpService } from '../../http-services/root.service';
import { Observable } from 'rxjs';
import { Cargo } from 'src/models/Cargo';
import { HttpClient } from '@angular/common/http';
import { Rubro } from 'src/models/Rubro';
import { TipoProducto } from 'src/models/TipoProducto';

@Injectable({
  providedIn: 'root'
})
export class GestionSharedService extends RootHttpService {


  protected baseURI: string = this.baseURI + "/gestion";

  constructor(
    protected http: HttpClient
  ) { 
    super();
  }

  public cargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(this.baseURI+"/cargos");
  }

  public rubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(this.baseURI+"/rubros");
  }

  public tiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.baseURI+"/tipos_producto");
  }
}
