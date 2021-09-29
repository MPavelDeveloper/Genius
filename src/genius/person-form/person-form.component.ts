import {Component, Input, Output} from '@angular/core';
import {Person, Sex} from "../../model/person";
import {EventEmitter} from "@angular/core";
import {PersonTypesEnum} from "../family-form/family-form.component";


export enum formStatesEnum {
  closeWindow = 'close',
  sendPerson = 'send',
}

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})


export class PersonFormComponent {

  @Input() person: Person;
  @Input() personType: PersonTypesEnum;

  @Output() transferPerson = new EventEmitter<Person>();

  importFormStatesEnum;
  PersonSex: Array<string>;


  constructor() {
    this.importFormStatesEnum = formStatesEnum;
    this.PersonSex = Object.values(Sex);
  }


  submit(formState: formStatesEnum) {

    console.log(this.person)
    if (this.person && formState === formStatesEnum.sendPerson) {
      this.transferPerson.emit(this.person)
    } else {
      this.transferPerson.emit(null)
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
