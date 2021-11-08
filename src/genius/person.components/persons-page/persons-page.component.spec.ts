import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsPageComponent } from './persons-page.component';
import {DataProvider} from "../../services/data-provider";
import {LocalStorageDataProvider} from "../../services/local-storage/local-storage-data-provider.service";

describe('HomePageComponent', () => {
  let component: PersonsPageComponent;
  let fixture: ComponentFixture<PersonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonsPageComponent],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
