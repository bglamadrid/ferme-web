import { TestBed } from '@angular/core/testing';

import { ProveedoresHttpService } from './proveedores.service';

describe('ProveedoresHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedoresHttpService = TestBed.get(ProveedoresHttpService);
    expect(service).toBeTruthy();
  });
});
