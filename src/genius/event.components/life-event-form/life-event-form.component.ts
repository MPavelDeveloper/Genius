import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LifeEvent, EventPrefix, LifeEventType} from '../../../model/life-event';

export enum LifeEventFormType {
  NEW_EVENT = 'newEvent',
  EXIST_EVENT = 'existEvent',
}

export enum LifeEventFormTemplateAction {
  SAVE = 'save',
  CHANGE = 'change',
  DELETE = 'delete',
  CANCEL = 'cancel',
}

export interface LifeEventFormActionDescriptor {
  action: LifeEventFormTemplateAction,
  lifeEvent: LifeEvent,
}

@Component({
  selector: 'life-event-form',
  templateUrl: './life-event-form.component.html',
  styleUrls: ['./life-event-form.component.scss']
})
export class LifeEventFormComponent {
  @Input() templateVersion: LifeEventFormType;
  @Input() lifeEvent: LifeEvent;
  @Input() personFullName: string;
  @Output() formEvents = new EventEmitter<LifeEventFormActionDescriptor>();
  public eventTypes: Array<string>;
  public lifeEventPrefix: Array<string>;
  public lifeEventFormType;
  public lifeEventFormAction;

  constructor() {
    this.lifeEvent = new LifeEvent();
    this.eventTypes = Object.values(LifeEventType);
    this.lifeEventPrefix = Object.values(EventPrefix);
    this.lifeEventFormType = LifeEventFormType;
    this.lifeEventFormAction = LifeEventFormTemplateAction;
  }

  public close(): void {
    this.formEvents.emit({
      action: this.lifeEventFormAction.CANCEL,
      lifeEvent: this.lifeEvent,
    });
  }

  public save(): void {
    switch(this.templateVersion) {
      case LifeEventFormType.NEW_EVENT:
        this.formEvents.emit({
          action: this.lifeEventFormAction.SAVE,
          lifeEvent: this.lifeEvent,
        });
        break;
      case LifeEventFormType.EXIST_EVENT:
        this.formEvents.emit({
          action: this.lifeEventFormAction.CHANGE,
          lifeEvent: this.lifeEvent,
        });
        break;
    }
  }
}
