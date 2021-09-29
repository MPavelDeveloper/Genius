import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyFormComponent } from './family-form.component';
import {DataProvider, LocalStorageDataProvider} from "../services/data-provider.service";

describe('FamilyFormComponent', () => {
  let component: FamilyFormComponent;
  let fixture: ComponentFixture<FamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyFormComponent],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
