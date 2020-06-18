import { Observable } from 'rxjs';
import { Cargo } from 'src/models/entities/Cargo';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { Persona } from 'src/models/Persona';
import { Rubro } from 'src/models/entities/Rubro';
import { TipoProducto } from 'src/models/entities/TipoProducto';

export interface SharedDataService {

  readAllCargos(): Observable<Cargo[]>;
  readAllRubros(): Observable<Rubro[]>;
  readAllPersonas(): Observable<Persona[]>;
  readAllFamiliasProducto(): Observable<FamiliaProducto[]>;
  readAllTiposProducto(): Observable<TipoProducto[]>;
  readAllTiposProductoByFamiliaId(idFamilia: number): Observable<TipoProducto[]>;
}
