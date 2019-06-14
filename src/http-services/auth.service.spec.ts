import { TestBed } from '@angular/core/testing';

import { AuthHttpService } from './auth.service';

describe('AuthHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHttpService = TestBed.get(AuthHttpService);
    expect(service).toBeTruthy();
  });
});
