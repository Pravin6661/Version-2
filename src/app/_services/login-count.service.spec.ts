/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginCountService } from './login-count.service';

describe('Service: LoginCount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginCountService]
    });
  });

  it('should ...', inject([LoginCountService], (service: LoginCountService) => {
    expect(service).toBeTruthy();
  }));
});
