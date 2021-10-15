import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Person} from "../../model/person";


@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PersonComponent{

  @Input() person: Person;
  @Input() templateVersion: string;

  @Output() returnedPerson = new EventEmitter<Person>();

  constructor() {
    this.templateVersion = 'fullTemplate';
  }


  returnPerson() {
    this.returnedPerson.emit(this.person);
  }


}
