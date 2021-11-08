import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Person} from '../../../model/person';

export enum PersonTemplateType {
  SHORT = 'shortTemplate',
  FULL = 'fullTemplate',
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
  personsTemplateType;

  constructor() {
    this.personsTemplateType = PersonTemplateType;
  }

  returnPerson() {
    this.returnedPerson.emit(this.person)
  }
}
