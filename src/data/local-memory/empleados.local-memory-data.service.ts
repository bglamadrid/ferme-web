import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Injectable } from '@angular/core';
import { Empleado } from 'src/models/entities/Empleado';

export const MOCK_EMPLOYEES: Partial<Empleado>[] = [
  {
    id: 1,
    nombreCompletoPersona: 'Sujeto de prueba',
    rutPersona: '1111111-1',
    direccionPersona: 'Calle Sin Salida 47',
    emailPersona: 'example@test.org'
  }
];

@Injectable()
export class EmpleadosLocalMemoryDataService
  extends EntityLocalMemoryDataService<Empleado> {

  constructor() {
    super();
    this.items = MOCK_EMPLOYEES.map(n => Object.assign(new Empleado(), n));
  }
}
