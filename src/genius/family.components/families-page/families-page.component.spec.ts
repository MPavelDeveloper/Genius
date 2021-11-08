import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesPageComponent } from './families-page.component';
import {DataProvider} from '../../services/data-provider';
import {LocalStorageDataProvider} from '../../services/local-storage/local-storage-data-provider.service';

describe('FamiliesPageComponent', () => {
  let component: FamiliesPageComponent;
  let fixture: ComponentFixture<FamiliesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesPageComponent ],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
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
