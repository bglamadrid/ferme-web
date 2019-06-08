import { TestBed } from '@angular/core/testing';

import { RootHttpService } from './root.service';

describe('RootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RootHttpService = TestBed.get(RootHttpService);
    expect(service).toBeTruthy();
  });
});
