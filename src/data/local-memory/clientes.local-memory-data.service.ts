import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Cliente } from 'src/models/entities/Cliente';
import { Injectable } from '@angular/core';

export const MOCK_CLIENTS: Partial<Cliente>[] = [
  {
    id: 1,
    nombre: 'Sujeto de prueba',
    rutPersona: '1111111-1',
    direccionPersona: 'Calle Sin Salida 47',
    emailPersona: 'example@test.org'
  }
];

@Injectable()
export class ClientesLocalMemoryDataService
  extends EntityLocalMemoryDataService<Cliente> {

  constructor() {
    super();
    this.items = MOCK_CLIENTS.map(n => Object.assign(new Cliente(), n));
  }
}
