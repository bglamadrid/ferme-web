import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';
import { CompositeEntityDataService } from '../composite-entity.data.iservice';
import { DetalleOrdenCompra } from 'src/models/entities/DetalleOrdenCompra';
import { Observable, of } from 'rxjs';

export const MOCK_PURCHASE_ORDERS: Partial<OrdenCompra>[] = [
  {
    id: 1,
    idEmpleado: 1
  }
];

@Injectable()
export class OrdenCompraLocalMemoryDataService
  extends EntityLocalMemoryDataService<OrdenCompra>
  implements CompositeEntityDataService<OrdenCompra, DetalleOrdenCompra> {

  protected items: OrdenCompra[] = MOCK_PURCHASE_ORDERS.map(n => Object.assign(new OrdenCompra(), n));;

  constructor() {
    super();
  }

  readDetailsById(id: number): Observable<DetalleOrdenCompra[]> {
    return of([]);
  }
}
