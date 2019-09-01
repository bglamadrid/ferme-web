import { Injectable } from '@angular/core';
import { RootHttpService } from './root-http.service';
import { Observable } from 'rxjs';
import { Cargo } from 'src/modelo/Cargo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rubro } from 'src/modelo/Rubro';
import { TipoProducto } from 'src/modelo/TipoProducto';
import { FamiliaProducto } from 'src/modelo/FamiliaProducto';
import { Persona } from 'src/modelo/Persona';
import { retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GestionSharedHttpService extends RootHttpService {


  protected baseURI: string = this.baseURI + '/gestion';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public cargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(
      this.baseURI + '/cargos'
    ).pipe(
      retry(2)
    );
  }

  public rubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(
      this.baseURI + '/rubros'
    ).pipe(
      retry(2)
    );
  }

  public personas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(
      this.baseURI + '/personas'
    ).pipe(
      retry(2)
    );
  }

  public familiasProducto(): Observable<FamiliaProducto[]> {
    return this.http.get<FamiliaProducto[]>(
      this.baseURI + '/familias_producto'
    ).pipe(
      retry(2)
    );
  }

  public tiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(
      this.baseURI + '/tipos_producto'
    ).pipe(
      retry(2)
    );
  }

  public tiposProductoByFamilia(idFamilia: number): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(
      this.baseURI + '/tipos_producto',
      this.parametrosHttp({
        familia: String(idFamilia)
      })
    ).pipe(
      retry(2)
    );
  }
}
