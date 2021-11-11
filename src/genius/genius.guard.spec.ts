import { TestBed } from '@angular/core/testing';

import { GeniusGuard } from './genius-guard.service';

describe('AppGuardGuard', () => {
  let guard: GeniusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GeniusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
