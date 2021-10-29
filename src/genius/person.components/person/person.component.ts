import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Person} from '../../../model/person';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction,
  LifeEventTemplateVersion
} from '../../life-event/life-event.component';
import {LifeEvent} from '../../../model/life-event';

export enum PersonTemplateType {
  SHORTEST = 'shortestTemplate',
  SHORTEST_DEL = 'shortestDelTemplate',
  SHORT = 'shortTemplate',
  FULL = 'fullTemplate',
  FULL_DATA = 'fullDataTemplate',
  EVENTS = 'eventsTemplate',
}

export enum PersonTemplateAction {
  GET = 'get',
  DELETE = 'delete',
}

export interface PersonDescriptor {
  action: PersonTemplateAction,
  person: Person,
}

export interface LifeEventDescriptor {
  action: LifeEventTemplateAction,
  person: Person,
  lifeEvent: LifeEvent,
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
  personTemplateAction;
  lifeEventTemplateVersion;

  constructor() {
    this.templateVersion = 'fullTemplate';
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
    this.personsTemplateType = PersonTemplateType;
    this.personTemplateAction = PersonTemplateAction;
  }

  returnPerson(personComponentAction: PersonTemplateAction) {
    // this.returnedPerson.emit({
    //   action: personComponentAction,
    //   person: this.person,
    // });
    this.returnedPerson.emit(this.person)
  }

  returnExistLifeEvent(lifeEventActionDescriptor: LifeEventActionDescriptor) {
    const descriptor: LifeEventDescriptor = {
      person: this.person,
      action: lifeEventActionDescriptor.action,
      lifeEvent: lifeEventActionDescriptor.lifeEvent,
    }
    this.returnedLifeEvent.emit(descriptor);
  }

  createNewLifeEvent() {
    this.newLifeEvent.emit(this.person);
  }

}
