import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LifeEvent, LifeEventPrefix, LifeEventType} from '../../model/life-event';

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

export interface LifeEventActionDescriptor {
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
  @Output() addedLifeEvent = new EventEmitter<LifeEventActionDescriptor>();
  public eventTypes: Array<string>;
  public lifeEventPrefix: Array<string>;
  public lifeEventFormType;
  public lifeEventFormAction;

  constructor() {
    this.lifeEvent = new LifeEvent();
    this.eventTypes = Object.values(LifeEventType);
    this.lifeEventPrefix = Object.values(LifeEventPrefix);
    this.lifeEventFormType = LifeEventFormType;
    this.lifeEventFormAction = LifeEventFormTemplateAction;
  }

  public returnLifeEvent(lifeEventFormAction: LifeEventFormTemplateAction) {
    (lifeEventFormAction === LifeEventFormTemplateAction.CANCEL) ? this.addedLifeEvent.emit(null) :
      this.addedLifeEvent.emit({
        action: lifeEventFormAction,
        lifeEvent: this.lifeEvent,
      });
  }
}
