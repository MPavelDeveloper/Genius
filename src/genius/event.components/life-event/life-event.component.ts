import {Component, Input, Output, EventEmitter} from '@angular/core';
import {LifeEvent} from '../../../model/life-event';

export enum LifeEventTemplateVersion {
  SHORTEST = 'shortest',
  SHORTEST_DEL = 'shotest_delete',
  SHORT = 'short',
  FULL = 'full',
}

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
  @Input() templateVersion: string;
  @Output() returnedLifeEvent = new EventEmitter<LifeEventActionDescriptor>();
  lifeEventTemplateVersion;
  lifeEventTemplateAction;

  constructor() {
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
    this.lifeEventTemplateAction = LifeEventTemplateAction
  }

  returnLifeEvent(lifeEventTemplateAction: LifeEventTemplateAction) {
    return this.returnedLifeEvent.emit({
      action: lifeEventTemplateAction,
      lifeEvent: this.lifeEvent,
    })
  }
}
