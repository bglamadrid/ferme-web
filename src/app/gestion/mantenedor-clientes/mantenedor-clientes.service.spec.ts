import { TestBed } from '@angular/core/testing';

import { MantenedorClientesGestionService } from './mantenedor-clientes.service';

describe('MantenedorClientesGestionService', () => {
  let service: MantenedorClientesGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorClientesGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
