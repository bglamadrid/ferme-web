import { TestBed } from '@angular/core/testing';

import { LoginHttpService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginHttpService = TestBed.get(LoginHttpService);
    expect(service).toBeTruthy();
  });
});
