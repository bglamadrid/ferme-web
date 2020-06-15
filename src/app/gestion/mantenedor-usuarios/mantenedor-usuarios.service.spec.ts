import { TestBed } from '@angular/core/testing';

import { MantenedorUsuariosGestionService } from './mantenedor-usuarios.service';

describe('MantenedorUsuariosGestionService', () => {
  let service: MantenedorUsuariosGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MantenedorUsuariosGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
