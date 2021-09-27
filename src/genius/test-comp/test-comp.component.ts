import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Person} from "../../model/person";
import {LocalStorageDataProvider} from "../services/data-provider.service";
import { NgModel } from '@angular/forms'

@Component({
  selector: 'app-test-comp',
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.scss']
})
export class TestCompComponent implements OnInit {

  formControl: FormGroup;
  person: Person = new Person();
  public title = 'connect';

  constructor() {

  }

  ngOnInit(): void {
    // this.formControl = new FormGroup({
    //   firstName: new FormControl(this.person.firstName, Validators.required),
    //   lastName: new FormControl(this.person.lastName),
    //   middleName: new FormControl(this.person.middleName),
    //   age: new FormControl(this.person.age),
    //   sex: new FormControl(this.person.sex),
    //   lifeEvent: new FormControl(this.person.lifeEvent),
    // })
  }


  submit() {
    console.log(this.person)
  }

  print() {
    console.log(this.title)
  }

}
