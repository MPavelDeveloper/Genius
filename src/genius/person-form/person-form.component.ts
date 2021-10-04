import {Component, Input, Output} from '@angular/core';
import {Person, Sex} from "../../model/person";
import {EventEmitter} from "@angular/core";
import {FormType} from "../family-form/family-form.component";
import {DataProvider} from "../services/data-provider.service";
import {Family} from "../../model/family";


@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})

export class PersonFormComponent {

  @Input() person: Person;
  @Input() personType: FormType;

  @Output() addedPerson = new EventEmitter<Person>();

  PersonSex: Array<string>;
  familyList: Array<Family>;

  constructor(private DataProvider: DataProvider) {
    this.PersonSex = Object.values(Sex);
  }

  close() {
    this.addedPerson.emit(null)
  }

  addNewPerson() {
    console.log(this.person)
    this.addedPerson.emit(this.person)
  }

  getFamilies() {
    this.familyList = this.DataProvider.getFamilies();
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
