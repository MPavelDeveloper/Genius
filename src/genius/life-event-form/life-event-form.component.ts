import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LifeEvent, LifeEventType} from '../../model/life-event';


@Component({
  selector: 'life-event-form',
  templateUrl: './life-event-form.component.html',
  styleUrls: ['./life-event-form.component.scss']
})
export class LifeEventFormComponent {

  @Input() lifeEvent: LifeEvent;
  @Output() addedLifeEvent = new EventEmitter<LifeEvent>();
  public eventTypes: Array<string>;

  constructor() {
    this.lifeEvent = new LifeEvent();
    this.eventTypes = Object.values(LifeEventType);
  }

  public close(): void {
    this.addedLifeEvent.emit(null);
  }

  public save(): void {
    this.addedLifeEvent.emit(this.lifeEvent);
  }
}
