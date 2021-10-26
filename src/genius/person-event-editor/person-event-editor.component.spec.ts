import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEventEditorComponent } from './person-event-editor.component';

describe('PersonEventEditorComponent', () => {
  let component: PersonEventEditorComponent;
  let fixture: ComponentFixture<PersonEventEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEventEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEventEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
