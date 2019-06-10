import { TestBed } from '@angular/core/testing';

import { GestionSharedHttpService } from './gestion-shared.service';

describe('GestionSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GestionSharedHttpService = TestBed.get(GestionSharedHttpService);
    expect(service).toBeTruthy();
  });
});
