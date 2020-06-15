import { TestBed } from '@angular/core/testing';

import { MantenedorEmpleadosGestionService } from './mantenedor-empleados.service';

describe('MantenedorEmpleadosGestionService', () => {
  let service: MantenedorEmpleadosGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorEmpleadosGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
