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
      console.log(this.family)
      console.log(this.persons)
    }

    this.personDialogVisible = false;
  }

  saveFamily(): void {
    if (this.familyValid()) {
      // catch new family
      if (!this.family.id) {
        this.family.id = this.dataProvider.getNewFamilyID()
        // save new family
        this.dataProvider.addNewFamily(this.family)
      }
      if (this.getChildren().length > 0) {
        this.getChildren().forEach(child => child.familyId = this.family.id)
      }

      this.addPersonsToCollection()
      // save new person's; continue current person's
      this.persons.forEach(person => this.dataProvider.addNewPerson(person))
      // save in base; one time
      this.dataProvider.putData()

      // clean family
      this.family = new Family()
      this.persons = []
      this.family.children = []
    }

  }

  familyValid(): boolean {
    if (!this.family.father) this.family.father = null;
    if (!this.family.mother) this.family.mother = null;
    let values = Object.values(this.family)

    for (let value of values) {
      if (Array.isArray(value)) {
        if (value.length > 0) return true
        continue
      }
      if (value !== null) return true
    }

    return false
  }

  addPersonsToCollection() {
    if (this.getFather()) this.persons.push(this.getFather())
    if (this.getMother()) this.persons.push(this.getMother())

    if (this.getChildren().length > 0) {
      for (let child of this.getChildren()) {
        this.persons.push(child)
      }
    }
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
      this.createNewPerson(FormType.FATHER)

    } else if (personType === FormType.MOTHER) {
      this.currentPerson = this.getMother()
      this.createNewPerson(FormType.MOTHER)
    }
  }


  getFather(): Person {
    return this.family.father;
  }

  getMother(): Person {
    return this.family.mother;
  }

  getChildren(): Array<Person> {
    return this.family.children;
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

