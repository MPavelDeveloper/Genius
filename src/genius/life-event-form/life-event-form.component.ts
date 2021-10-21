import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {LifeEvent, LifeEventType} from '../../model/life-event';


@Component({
  selector: 'life-event-form',
  templateUrl: './life-event-form.component.html',
  styleUrls: ['./life-event-form.component.scss']
})
export class LifeEventFormComponent {

  @Input() lifeEvent: LifeEvent;
  @Output() addedLifeEvent = new EventEmitter<LifeEvent>();
  public lifeEventTypes: Array<string>;

  constructor() {
    this.lifeEvent = new LifeEvent();
    this.lifeEventTypes = Object.values(LifeEventType);
  }

  public returnLifeEvent(lifeEvent: LifeEvent){
    this.addedLifeEvent.emit(lifeEvent);
    console.log(this.lifeEvent)
  }
}
