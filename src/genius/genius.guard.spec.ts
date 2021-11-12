import { TestBed } from '@angular/core/testing';

import { GeniusGuard } from './genius-guard.service';
import {DataProvider} from './services/data-provider';
import {LocalStorageDataProvider} from './services/local-storage/local-storage-data-provider.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppGuardGuard', () => {
  let guard: GeniusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    });
    guard = TestBed.inject(GeniusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
