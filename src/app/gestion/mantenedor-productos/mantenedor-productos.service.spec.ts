import { TestBed } from '@angular/core/testing';

import { MantenedorProductosGestionService } from './mantenedor-productos.service';

describe('MantenedorProductosGestionService', () => {
  let service: MantenedorProductosGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorProductosGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
