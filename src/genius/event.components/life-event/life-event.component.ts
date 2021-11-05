import {Component, Input, Output, EventEmitter} from '@angular/core';
import {LifeEvent} from '../../../model/life-event';

export enum LifeEventTemplateAction {
  GET = 'get',
  DELETE = 'delete',
}

export interface LifeEventActionDescriptor {
  action: LifeEventTemplateAction,
  lifeEvent: LifeEvent,
}

@Component({
  selector: 'life-event',
  templateUrl: './life-event.component.html',
  styleUrls: ['./life-event.component.scss']
})
export class LifeEventComponent {

  @Input() lifeEvent: LifeEvent;
  @Output() returnedLifeEvent = new EventEmitter<LifeEventActionDescriptor>();
  lifeEventTemplateAction;

  constructor() {
    this.lifeEventTemplateAction = LifeEventTemplateAction
  }

  returnLifeEvent(lifeEventTemplateAction: LifeEventTemplateAction) {
    return this.returnedLifeEvent.emit({
      action: lifeEventTemplateAction,
      lifeEvent: this.lifeEvent,
    })
  }
}
