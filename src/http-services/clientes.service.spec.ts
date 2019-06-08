import { TestBed } from '@angular/core/testing';

import { ClientesHttpService } from './clientes.service';

describe('ClientesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientesHttpService = TestBed.get(ClientesHttpService);
    expect(service).toBeTruthy();
  });
});
