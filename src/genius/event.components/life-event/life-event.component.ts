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

  public deleteLifeEvent() {
    return this.returnedLifeEvent.emit({
      action: LifeEventTemplateAction.DELETE,
      lifeEvent: this.lifeEvent,
    })
  }

  public loadLifeEvent() {
    return this.returnedLifeEvent.emit({
      action: LifeEventTemplateAction.GET,
      lifeEvent: this.lifeEvent,
    })
  }
}
