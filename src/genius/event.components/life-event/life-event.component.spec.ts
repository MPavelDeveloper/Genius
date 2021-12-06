import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LifeEventComponent, LifeEventTemplateAction} from './life-event.component';
import {LifeEvent, LifeEventType} from '../../../model/life-event';
import {By} from '@angular/platform-browser';

describe('LifeEventComponent', () => {
  let component: LifeEventComponent;
  let fixture: ComponentFixture<LifeEventComponent>;
  let testEvent: LifeEvent = {
    type: LifeEventType.BIRTH,
    date: new Date('1993-12-22'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeEventComponent);
    component = fixture.componentInstance;
    component.lifeEvent = testEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('@Output returnedLifeEvent, should be emit', () => {
    let event = spyOn(component.returnedLifeEvent, 'emit');
    component.deleteLifeEvent();
    expect(event).toHaveBeenCalledWith({
      action: LifeEventTemplateAction.DELETE,
      lifeEvent: testEvent,
    });
    component.loadLifeEvent();
    expect(event).toHaveBeenCalledWith({
      action: LifeEventTemplateAction.GET,
      lifeEvent: testEvent,
    });
  });

  it('should be called, deleteLifeEvent(), loadLifeEvent()', () => {
    spyOn(component, 'loadLifeEvent');
    spyOn(component, 'deleteLifeEvent');
    let descriptionElem = fixture.debugElement.query(By.css('.life-event-description'));
    let btnDel = fixture.debugElement.query(By.css('.btn-del'));
    descriptionElem.nativeElement.click();
    btnDel.nativeElement.click();
    expect(component.loadLifeEvent).toHaveBeenCalled();
    expect(component.deleteLifeEvent).toHaveBeenCalled();
  });

  it('should be the same, event description in DOM', () => {
    let descriptionElem = fixture.debugElement.query(By.css('.life-event-description'));
    expect(descriptionElem.nativeElement.textContent).toBe(`${testEvent.type} ${testEvent.date.toString()}`);
  })
});
