import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditorComponent } from './person-editor.component';
import {DataProvider} from "../services/data-provider";
import {LocalStorageDataProvider} from "../services/local-storage/local-storage-data-provider.service";

describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEditorComponent ],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
