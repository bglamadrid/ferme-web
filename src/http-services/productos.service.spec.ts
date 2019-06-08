import { TestBed } from '@angular/core/testing';

import { ProductosHttpService } from './productos.service';

describe('ProductosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductosHttpService = TestBed.get(ProductosHttpService);
    expect(service).toBeTruthy();
  });
});
