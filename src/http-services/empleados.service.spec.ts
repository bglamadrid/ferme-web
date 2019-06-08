import { TestBed } from '@angular/core/testing';

import { EmpleadosHttpService } from './empleados.service';

describe('EmpleadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpleadosHttpService = TestBed.get(EmpleadosHttpService);
    expect(service).toBeTruthy();
  });
});
