import { TestBed, async, inject } from '@angular/core/testing';

import { AzureGuardGuard } from './azure-guard.guard';

describe('AzureGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AzureGuardGuard]
    });
  });

  it('should ...', inject([AzureGuardGuard], (guard: AzureGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
