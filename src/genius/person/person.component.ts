import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Person} from "../../model/person";
import {rendererTypeName} from "@angular/compiler";

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PersonComponent {

  @Input() person: Person;
  @Input() showShortView: Boolean;

  @Output() returnedPerson = new EventEmitter<Person>();

  constructor() {
    this.showShortView = false;
  }

  returnPerson() {
    this.returnedPerson.emit(this.person);
  }
}
