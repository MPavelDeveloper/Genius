import { TestBed } from '@angular/core/testing';

import { FamilyTreeTestService } from './family-tree.service';

describe('FamilyTreeTestService', () => {
  let service: FamilyTreeTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamilyTreeTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
