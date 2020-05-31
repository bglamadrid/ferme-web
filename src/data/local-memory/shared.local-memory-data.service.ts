import { Observable } from 'rxjs';
import { Cargo } from 'src/models/entities/Cargo';
import { FamiliaProducto } from 'src/models/entities/FamiliaProducto';
import { Persona } from 'src/models/entities/Persona';
import { Rubro } from 'src/models/entities/Rubro';
import { TipoProducto } from 'src/models/entities/TipoProducto';
import { Injectable } from '@angular/core';
import { SharedDataService } from '../shared.data.iservice';

@Injectable()
export class SharedLocalMemoryDataService
  implements SharedDataService {

  cargos(): Observable<Cargo[]> {
    throw new Error('Method not implemented.');
  }
  rubros(): Observable<Rubro[]> {
    throw new Error('Method not implemented.');
  }
  personas(): Observable<Persona[]> {
    throw new Error('Method not implemented.');
  }
  familiasProducto(): Observable<FamiliaProducto[]> {
    throw new Error('Method not implemented.');
  }
  tiposProducto(): Observable<TipoProducto[]> {
    throw new Error('Method not implemented.');
  }
  tiposProductoByFamilia(idFamilia: number): Observable<TipoProducto[]> {
    throw new Error('Method not implemented.');
  }
}
