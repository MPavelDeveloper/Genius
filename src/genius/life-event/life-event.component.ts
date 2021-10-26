import {Component, Input, Output, EventEmitter} from '@angular/core';
import {LifeEvent} from '../../model/life-event';

export enum LifeEventTemplateVersion {
  SHORTEST = 'shortest',
  SHORT = 'short',
  FULL = 'full',
}

@Component({
  selector: 'life-event',
  templateUrl: './life-event.component.html',
  styleUrls: ['./life-event.component.scss']
})
export class LifeEventComponent {

  @Input() lifeEvent: LifeEvent;
  @Input() templateVersion: string;
  @Output() returnedLifeEvent = new EventEmitter<LifeEvent>();
  lifeEventTemplateVersion;

  constructor() {
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
  }

  returnLifeEvent() {
    return this.returnedLifeEvent.emit(this.lifeEvent)
  }
}
