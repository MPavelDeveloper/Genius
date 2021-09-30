import {Component} from '@angular/core';
import {Family} from "../../model/family";
import {DataProvider} from "../services/data-provider.service";
import {Person} from "../../model/person";

export enum FormType {
  FATHER = 'father',
  MOTHER = 'mother',
  CHILD = 'child',
}

@Component({
  selector: 'family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent {

  public formType;
  public family: Family;
  public persons: Array<Person>;
  public currentPerson: Person;
  public childrenAmount: Array<number>;
  public personType: FormType;
  public personDialogVisible: boolean;

  constructor(private dataProvider: DataProvider) {
    this.formType = FormType;
    this.family = new Family();
    this.family.children = [];
    this.currentPerson = new Person();
    this.persons = [];
    this.childrenAmount = [];
  }

  createNewPerson(personType: FormType): void {
    this.personDialogVisible = true;
    this.personType = personType;
  }

  addPersonInFamily(person: Person): void {

    if (person && Object.keys(person).length > 0) {
      this.currentPerson = new Person()

      if (this.personType === FormType.FATHER) {
        this.setFather(person)
      } else if (this.personType === FormType.MOTHER) {
        this.setMother(person)
      } else if (this.personType === FormType.CHILD) {
        this.setChild(person)
      }

      this.persons.push(person);
    }

    this.personDialogVisible = false;
  }

  saveFamily(): void {
    if (this.familyValid()) {
      this.persons.forEach(person => this.dataProvider.addPerson(person))
      this.dataProvider.addFamily(this.family)

      this.family = new Family()
      this.persons = []
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

  deletePerson(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.setFather(null)
    } else if (personType === FormType.MOTHER) {
      this.setMother(null)
    }
  }

  changePerson(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.currentPerson = this.getFather()
      this.cleanPersons(this.currentPerson, this.persons);
      this.createNewPerson(FormType.FATHER)

    } else if (personType === FormType.MOTHER) {
      this.currentPerson = this.getMother()
      this.cleanPersons(this.currentPerson, this.persons)
      this.createNewPerson(FormType.MOTHER)
    }
  }

  cleanPersons(currentPerson: Person, persons: Array<Person>): void {
    const indexTargetPerson = this.persons.findIndex((person:Person) => {
      if(person.firstName === this.currentPerson.firstName &&
        person.age === this.currentPerson.age &&
        person.sex === this.currentPerson.sex) return true
      return false
    })

    if(indexTargetPerson >= 0) {
      console.log(this.persons.splice(indexTargetPerson, 1));
    }

  }

  getFather(): Person {
    return this.family.father
  }

  getMother(): Person {
    return this.family.mother
  }

  setFather(person: Person): void {
    this.family.father = person;
  }

  setMother(person: Person): void {
    this.family.mother = person;
  }

  setChild(person: Person): void {
    this.family.children.push(person)
  }
}

