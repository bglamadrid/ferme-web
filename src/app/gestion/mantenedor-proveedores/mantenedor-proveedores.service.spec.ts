import { TestBed } from '@angular/core/testing';

import { MantenedorProveedoresGestionService } from './mantenedor-proveedores.service';

describe('MantenedorProveedoresGestionService', () => {
  let service: MantenedorProveedoresGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorProveedoresGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
