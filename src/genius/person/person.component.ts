import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Person} from '../../model/person';
import {LifeEventTemplateVersion} from '../life-event/life-event.component';
import {LifeEvent} from '../../model/life-event';

export enum PersonsTemplateType {
  SHORTEST = 'shortestTemplate',
  SHORT = 'shortTemplate',
  FULL = 'fullTemplate',
  FULL_DATA = 'fullDataTemplate',
  EVENTS = 'eventsTemplate',
}
export interface LifeEventDescriptor {
  person: Person;
  lifeEvent: LifeEvent;
}

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PersonComponent implements OnInit{

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

  ngOnInit(): void {
    console.log(this.person)
  }

  returnPerson() {
    this.returnedPerson.emit(this.person);
  }

  returnExistLifeEvent(lifeEvent: LifeEvent) {
    const descriptor: LifeEventDescriptor =  {
      person: this.person,
      lifeEvent: lifeEvent
    }
    return this.returnedLifeEvent.emit(descriptor);
  }

  createNewLifeEvent() {
    return this.newLifeEvent.emit(this.person);
  }
}
