import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Injectable } from '@angular/core';
import { Proveedor } from 'src/models/entities/Proveedor';

export const MOCK_EMPLOYEES: Partial<Proveedor>[] = [
  {
    id: 1,
    nombre: 'Sujeto de pruebas',
    rutPersona: '1111111-1'
  }
];

@Injectable()
export class ProveedoresLocalMemoryDataService
  extends EntityLocalMemoryDataService<Proveedor> {

  protected items: Proveedor[] = MOCK_EMPLOYEES.map(n => Object.assign(new Proveedor(), n));

  constructor() {
    super();
  }
}
