import {Component, OnInit, ViewChild} from '@angular/core';
import {Family} from "../../model/family";
import {DataProvider} from "../services/data-provider.service";
import {Person} from "../../model/person";

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent implements OnInit {

  family: Family = new Family();
  personDialogVisible: boolean;
  currentPerson: Person = new Person();
  children: Array<Person> = [];

  constructor(private dataProvider: DataProvider) {
  }

  ngOnInit(): void {
  }

  showClosePersonForm() {
    this.personDialogVisible = !this.personDialogVisible
  }

  createPerson(person: Person) {
    this.dataProvider.addPerson(person)
  }

  catchTransferPerson(ev: any): void {
    if (ev === null) this.personDialogVisible = false
    console.log(ev)
  }

  createChild() {
    this.children.push(new Person())
    console.log(this.children)
  }
}

