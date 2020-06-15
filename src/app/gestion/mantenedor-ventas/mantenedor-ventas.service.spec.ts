import { TestBed } from '@angular/core/testing';

import { MantenedorVentasGestionService } from './mantenedor-ventas.service';

describe('MantenedorVentasGestionService', () => {
  let service: MantenedorVentasGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorVentasGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
