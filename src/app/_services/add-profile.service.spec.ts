/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddProfileService } from './add-profile.service';

describe('Service: AddProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddProfileService]
    });
  });

  it('should ...', inject([AddProfileService], (service: AddProfileService) => {
    expect(service).toBeTruthy();
  }));
});
