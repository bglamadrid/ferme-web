import { Observable } from 'rxjs';
import { Cargo } from 'src/models/entities/Cargo';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { Persona } from 'src/models/entities/Persona';
import { Rubro } from 'src/models/entities/Rubro';
import { TipoProducto } from 'src/models/entities/TipoProducto';

export interface SharedDataService {

  cargos(): Observable<Cargo[]>;
  rubros(): Observable<Rubro[]>;
  personas(): Observable<Persona[]>;
  familiasProducto(): Observable<FamiliaProducto[]>;
  tiposProducto(): Observable<TipoProducto[]>;
  tiposProductoByFamilia(idFamilia: number): Observable<TipoProducto[]>;
}
