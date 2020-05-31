import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cargo } from 'src/models/entities/Cargo';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { Persona } from 'src/models/entities/Persona';
import { Rubro } from 'src/models/entities/Rubro';
import { TipoProducto } from 'src/models/entities/TipoProducto';
import { SharedDataService } from '../shared.data.iservice';

export const MOCK_CARGOS: Cargo[] = [
  { idCargo: 1, descripcionCargo: 'Administrador' }
];

export const MOCK_RUBROS: Rubro[] = [
  { idRubro: 1, descripcionRubro: '' }
];

export const MOCK_PEOPLE: Persona[] = [
  { idPersona: 1, nombreCompletoPersona: 'Anónimo' }
];

export const MOCK_PRODUCT_FAMILIES: FamiliaProducto[] = [
  { idFamiliaProducto: 1, descripcionFamiliaProducto: 'Familia de producto 1', idProveedor: 1 }
];

export const MOCK_PRODUCT_TYPES: TipoProducto[] = [
  { idTipoProducto: 1, descripcionTipoProducto: 'Tipo de producto 1', idFamiliaProducto: 1 }
];

@Injectable()
export class SharedLocalMemoryDataService
  implements SharedDataService {

  public readAllCargos(): Observable<Cargo[]> {
    return of(MOCK_CARGOS);
  }

  public readAllRubros(): Observable<Rubro[]> {
    return of(MOCK_RUBROS);
  }

  public readAllPersonas(): Observable<Persona[]> {
    return of(MOCK_PEOPLE);
  }

  public readAllFamiliasProducto(): Observable<FamiliaProducto[]> {
    return of(MOCK_PRODUCT_FAMILIES);
  }

  public readAllTiposProducto(): Observable<TipoProducto[]> {
    return of(MOCK_PRODUCT_TYPES);
  }

  public readAllTiposProductoByFamiliaId(idFamilia: number): Observable<TipoProducto[]> {
    return of(MOCK_PRODUCT_TYPES).pipe(
      map(types => types.filter(t => t.idFamiliaProducto === idFamilia))
    );
  }
}
