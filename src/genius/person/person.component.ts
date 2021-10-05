import {Component, Input, ViewEncapsulation} from '@angular/core';
import {Person} from "../../model/person";

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class PersonComponent {

  @Input()
  person: Person;
  @Input()
  showShortView: Boolean;

  constructor() {
    this.showShortView = false;
  }
}
