import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Person} from "../../model/person";
import {LocalStorageDataProvider} from "../services/data-provider.service";
import {EventEmitter} from "@angular/core";


@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})


export class PersonFormComponent {

  @Input() person: Person;

  @Output()
  transferPerson = new EventEmitter<Person>()


  constructor(private localStorageDataProvider: LocalStorageDataProvider) {
  }

  submit(person: Person) {
    console.log(this.person)
    if (person) {
      this.transferPerson.emit(person)
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
