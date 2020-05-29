import { EntityLocalMemoryDataService } from './local-memory-data.abstract-service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/models/entities/Usuario';

export const MOCK_USERS: Partial<Usuario>[] = [
  {
    id: 1
  }
];

@Injectable()
export class UsuariosLocalMemoryDataService
  extends EntityLocalMemoryDataService<Usuario> {

  constructor() {
    super();
    this.items = MOCK_USERS.map(n => Object.assign(new Usuario(), n));
  }
}
