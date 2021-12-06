import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LifeEventFormComponent, LifeEventFormTemplateAction, LifeEventFormType} from './life-event-form.component';
import {FormsModule} from '@angular/forms';
import {LifeEventType} from '../../../model/life-event';

describe('LifeEventComponent', () => {
  let component: LifeEventFormComponent;
  let fixture: ComponentFixture<LifeEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LifeEventFormComponent]
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

  it(', close', () => {
    let event = spyOn(component.formEvents, 'emit');
    component.lifeEvent = {
      type: LifeEventType.BIRTH,
      date: new Date('1989-12-22'),
    }
    component.close();
    expect(event).toHaveBeenCalledWith({
      action: LifeEventFormTemplateAction.CANCEL,
      lifeEvent: component.lifeEvent,
    });
  });

  it(', save', () => {
    let event = spyOn(component.formEvents, 'emit');
    component.lifeEvent = {
      type: LifeEventType.BIRTH,
      date: new Date('1989-12-22'),
    }
    component.templateVersion = LifeEventFormType.NEW_EVENT;
    component.save();
    expect(event).toHaveBeenCalledWith({
      action: LifeEventFormTemplateAction.SAVE,
      lifeEvent: component.lifeEvent,
    });
    component.templateVersion = LifeEventFormType.EXIST_EVENT;
    component.save();
    expect(event).toHaveBeenCalledWith({
      action: LifeEventFormTemplateAction.CHANGE,
      lifeEvent: component.lifeEvent,
    })
  });
});
