import { TestBed } from '@angular/core/testing';

import { MantenedorOrdenesCompraGestionService } from './mantenedor-ordenes-compra.service';

describe('MantenedorOrdenesCompraGestionService', () => {
  let service: MantenedorOrdenesCompraGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorOrdenesCompraGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
