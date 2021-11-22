import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesPageComponent } from './families-page.component';
import {DataProvider} from '../../services/data-provider';
import {LocalStorageDataProvider} from '../../services/local-storage/local-storage-data-provider.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpDataProvider} from '../../services/http-provider/http-data-provider.service';

describe('FamiliesPageComponent', () => {
  let component: FamiliesPageComponent;
  let fixture: ComponentFixture<FamiliesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesPageComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {provide: DataProvider, useValue: new LocalStorageDataProvider()},
        HttpDataProvider
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
