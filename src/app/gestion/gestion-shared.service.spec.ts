import { TestBed } from '@angular/core/testing';

import { GestionSharedService } from './gestion-shared.service';

describe('GestionSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionSharedService = TestBed.get(GestionSharedService);
    expect(service).toBeTruthy();
  });
});
