import { TestBed } from '@angular/core/testing';

import { DataServiceProvider } from './data-service-provider.service';

describe('DataServiceProviderService', () => {
  let service: DataServiceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataServiceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
