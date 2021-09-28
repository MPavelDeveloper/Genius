import {Component, OnInit} from '@angular/core';
import {Family} from "../../model/family";
import {DataProvider} from "../services/data-provider.service";
import {Person} from "../../model/person";


@Component({
  selector: 'family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent implements OnInit {

  public family: Family;
  public persons: Array<Person>;
  public currentPerson: Person;
  public childrenAmount: Array<number>;
  public personType: string;
  public personDialogVisible: boolean;

  constructor(private dataProvider: DataProvider) {
    this.family = new Family();
    this.family.children = [];
    this.currentPerson = new Person();
    this.persons = [];
    this.childrenAmount = [];
  }


  ngOnInit(): void {
  }

  createNewPerson(str: string) {
    this.personDialogVisible = true;
    this.personType = str;
  }


  addPersonInFamily(person: any): void {

    if (person && Object.keys(person).length > 0) {
      this.currentPerson = new Person()

      if (this.personType === 'father' || this.personType === 'mother')
        this.family[this.personType] = person;
      if (this.personType === 'child')
        this.family.children.push(person)

      this.persons.push(person);
    }

    this.personDialogVisible = false;
  }

  saveFamily(): void {
    if (this.familyValid()) {
      this.persons.forEach(person => this.dataProvider.addPerson(person))
      this.dataProvider.addFamily(this.family)

      this.family = new Family()
      this.family.children = []
    }

  }

  familyValid(): boolean {
    if (!this.family.father) this.family.father = null;
    if (!this.family.mother) this.family.mother = null;
    if (this.family.children.length === 0) this.family.children = null;

    let values = Object.values(this.family)

    for (let value of values) {
      if (value !== null) return true
    }

    this.family.children = []
    return false
  }


  addChildTemplate(): void {
    this.childrenAmount.push(1);
  }

  deleteChildTemplate(): void {
    this.childrenAmount.pop();
  }


  deletePerson(str: string): void {
    if (str === 'father' || str === 'mother') {
      this.family[str] = null
    }
  }

  changePerson(str:string): void {
  }
}

