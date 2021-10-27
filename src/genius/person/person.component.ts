import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Person} from '../../model/person';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction,
  LifeEventTemplateVersion
} from '../life-event/life-event.component';
import {LifeEvent} from '../../model/life-event';

export enum PersonsTemplateType {
  SHORTEST = 'shortestTemplate',
  SHORTEST_DEL = 'shortestDelTemplate',
  SHORT = 'shortTemplate',
  FULL = 'fullTemplate',
  FULL_DATA = 'fullDataTemplate',
  EVENTS = 'eventsTemplate',
}

export interface LifeEventDescriptor {
  action: LifeEventTemplateAction,
  person: Person;
  lifeEvent: LifeEvent;
}

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PersonComponent {

  @Input() person: Person;
  @Input() templateVersion: string;
  @Output() returnedPerson = new EventEmitter<Person>();
  @Output() returnedLifeEvent = new EventEmitter<LifeEventDescriptor>();
  @Output() newLifeEvent = new EventEmitter<Person>();
  personsTemplateType;
  lifeEventTemplateVersion;

  constructor() {
    this.templateVersion = 'fullTemplate';
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
    this.personsTemplateType = PersonsTemplateType;
  }

  returnPerson() {
    this.returnedPerson.emit(this.person);
  }

  returnExistLifeEvent(lifeEventActionDescriptor: LifeEventActionDescriptor) {
    const descriptor: LifeEventDescriptor = {
      person: this.person,
      action: lifeEventActionDescriptor.action,
      lifeEvent: lifeEventActionDescriptor.lifeEvent,
    }
    return this.returnedLifeEvent.emit(descriptor);
  }

  createNewLifeEvent() {
    return this.newLifeEvent.emit(this.person);
  }
}
