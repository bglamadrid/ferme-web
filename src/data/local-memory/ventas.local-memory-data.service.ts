import { Injectable } from '@angular/core';
import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { OrdenCompra } from 'src/models/entities/OrdenCompra';
import { Venta } from 'src/models/entities/Venta';

export const MOCK_SALES: Partial<Venta>[] = [
  {
    id: 1,
    idEmpleado: 1
  }
];

@Injectable()
export class VentasLocalMemoryDataService
  extends EntityLocalMemoryDataService<Venta> {

  protected items: Venta[] = MOCK_SALES.map(n => Object.assign(new Venta(), n));

  constructor() {
    super();
  }
}
