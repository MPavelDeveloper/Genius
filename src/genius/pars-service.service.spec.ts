import { TestBed } from '@angular/core/testing';

import { ParsService } from './pars-service.service';

describe('ParsServiceService', () => {
  let service: ParsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
