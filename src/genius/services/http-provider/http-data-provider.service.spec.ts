import { TestBed } from '@angular/core/testing';

import { HttpDataProvider } from './http-data-provider.service';

describe('HttpDataProviderService', () => {
  let service: HttpDataProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDataProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
