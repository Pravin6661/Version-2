/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssesmentService } from './assesment.service';

describe('Service: Assesment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssesmentService]
    });
  });

  it('should ...', inject([AssesmentService], (service: AssesmentService) => {
    expect(service).toBeTruthy();
  }));
});
