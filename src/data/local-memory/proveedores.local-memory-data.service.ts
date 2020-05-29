import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Injectable } from '@angular/core';
import { Proveedor } from 'src/models/entities/Proveedor';

export const MOCK_EMPLOYEES: Partial<Proveedor>[] = [
  {
    id: 1
  }
];

@Injectable()
export class ProveedoresLocalMemoryDataService
  extends EntityLocalMemoryDataService<Proveedor> {

  constructor() {
    super();
    this.items = MOCK_EMPLOYEES.map(n => Object.assign(new Proveedor(), n));
  }
}
