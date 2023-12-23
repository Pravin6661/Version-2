/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddAssesmentService } from './add-assesment.service';

describe('Service: AddAssesment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAssesmentService]
    });
  });

  it('should ...', inject([AddAssesmentService], (service: AddAssesmentService) => {
    expect(service).toBeTruthy();
  }));
});
