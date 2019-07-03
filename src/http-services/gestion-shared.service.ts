import { Injectable } from '@angular/core';
import { RootHttpService } from './root.service';
import { Observable } from 'rxjs';
import { Cargo } from 'src/modelo/Cargo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rubro } from 'src/modelo/Rubro';
import { TipoProducto } from 'src/modelo/TipoProducto';
import { FamiliaProducto } from 'src/modelo/FamiliaProducto';
import { Persona } from 'src/modelo/Persona';

@Injectable({
  providedIn: 'root'
})
export class GestionSharedHttpService extends RootHttpService {


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

  public personas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseURI+"/personas");
  }

  public familiasProducto(): Observable<FamiliaProducto[]> {
    return this.http.get<FamiliaProducto[]>(this.baseURI+"/familias_producto");
  }

  public tiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.baseURI+"/tipos_producto");
  }

  public tiposProductoByFamilia(idFamilia: number): Observable<TipoProducto[]> {
    const queryParams: HttpParams = new HttpParams().append("familia", String(idFamilia));
    return this.http.get<TipoProducto[]>(this.baseURI+"/tipos_producto", { params: queryParams });
  }
}
