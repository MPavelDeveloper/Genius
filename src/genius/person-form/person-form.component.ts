import {Component, Input, Output} from '@angular/core';
import {Person, Sex} from "../../model/person";
import {EventEmitter} from "@angular/core";
import {FormType} from "../family-form/family-form.component";

export enum FormState {
  CLOSE_WINDOW = 'close',
  SEND_PERSON = 'send',
}

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})

export class PersonFormComponent {

  @Input() person: Person;
  @Input() personType: FormType;

  @Output() addedPerson = new EventEmitter<Person>();

  formStates;
  PersonSex: Array<string>;

  constructor() {
    this.formStates = FormState;
    this.PersonSex = Object.values(Sex);
  }

  submit(formState: FormState) {
    console.log(this.person)
    if (this.person && formState === FormState.SEND_PERSON) {
      this.addedPerson.emit(this.person)
    } else {
      this.addedPerson.emit(null)
    }
  }


  // validation(): boolean {
  //   let flag = true;
  // let inputsArr: Array<string> = [];
  // inputsArr.push(this.person.firstName);
  // inputsArr.push(this.person.a);
  // inputsArr.push(this.person.sex);

  // inputsArr.forEach((elem) => {
  //   if (elem) {
  //     elem.style.background = '#fbb8b8';
  //     flag = false;
  //   } else {
  //     elem.style.background = 'snow';
  //   }
  // });
  //
  // return flag
  // }

}
