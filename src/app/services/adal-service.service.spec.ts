import { TestBed, inject } from '@angular/core/testing';

import { AdalServiceService } from './adal-service.service';

describe('AdalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdalServiceService]
    });
  });

  it('should be created', inject([AdalServiceService], (service: AdalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
