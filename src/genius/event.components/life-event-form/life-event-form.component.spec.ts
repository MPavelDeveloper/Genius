import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeEventFormComponent } from './life-event-form.component';

describe('LifeEventComponent', () => {
  let component: LifeEventFormComponent;
  let fixture: ComponentFixture<LifeEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeEventFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
