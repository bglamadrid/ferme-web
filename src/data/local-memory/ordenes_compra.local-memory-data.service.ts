import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';

export const MOCK_PURCHASE_ORDERS: Partial<OrdenCompra>[] = [
  {
    id: 1,
    idEmpleado: 1
  }
];

@Injectable()
export class OrdenCompraLocalMemoryDataService
  extends EntityLocalMemoryDataService<OrdenCompra> {

  protected items: OrdenCompra[] = MOCK_PURCHASE_ORDERS.map(n => Object.assign(new OrdenCompra(), n));;

  constructor() {
    super();
  }
}
