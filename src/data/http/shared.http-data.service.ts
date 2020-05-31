import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Cargo } from 'src/models/entities/Cargo';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { Persona } from 'src/models/Persona';
import { Rubro } from 'src/models/entities/Rubro';
import { TipoProducto } from 'src/models/entities/TipoProducto';
import { SharedDataService } from '../shared.data.iservice';
import { HttpService } from './http.abstract-service';

@Injectable()
export class SharedHttpDataService
  extends HttpService
  implements SharedDataService {

  protected baseURI: string = this.baseURI + '/gestion';

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public readAllCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(
      this.baseURI + '/cargos'
    ).pipe(
      retry(2)
    );
  }

  public readAllRubros(): Observable<Rubro[]> {
    return this.http.get<Rubro[]>(
      this.baseURI + '/rubros'
    ).pipe(
      retry(2)
    );
  }

  public readAllPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(
      this.baseURI + '/personas'
    ).pipe(
      retry(2)
    );
  }

  public readAllFamiliasProducto(): Observable<FamiliaProducto[]> {
    return this.http.get<FamiliaProducto[]>(
      this.baseURI + '/familias_producto'
    ).pipe(
      retry(2)
    );
  }

  public readAllTiposProducto(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(
      this.baseURI + '/tipos_producto'
    ).pipe(
      retry(2)
    );
  }

  public readAllTiposProductoByFamiliaId(idFamilia: number): Observable<TipoProducto[]> {
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
