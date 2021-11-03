import { TestBed } from '@angular/core/testing';

import { SelectPersonTransferService } from './select-person-transfer.service';

describe('FamilyPersonService', () => {
  let service: SelectPersonTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectPersonTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
