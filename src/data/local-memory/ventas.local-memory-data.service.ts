import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Venta } from 'src/models/entities/Venta';
import { DetalleVenta } from 'src/models/entities/DetalleVenta';
import { CompositeEntityDataService } from '../composite-entity.data.iservice';
import { Observable, of } from 'rxjs';

export const MOCK_SALES: Partial<Venta>[] = [
  {
    id: 1,
    idEmpleado: 1
  }
];

@Injectable()
export class VentasLocalMemoryDataService
  extends EntityLocalMemoryDataService<Venta>
  implements CompositeEntityDataService<Venta, DetalleVenta> {

  protected items: Venta[] = MOCK_SALES.map(n => Object.assign(new Venta(), n));

  constructor() {
    super();
  }

  readDetailsById(id: number): Observable<DetalleVenta[]> {
    return of([]);
  }
}
