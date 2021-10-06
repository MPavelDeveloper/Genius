import {Component} from '@angular/core';
import {Family} from "../../model/family";
import {DataProvider} from "../services/data-provider.service";
import {Person, Sex} from "../../model/person";

export enum FormType {
  FATHER = 'father',
  MOTHER = 'mother',
  CHILD = 'child',
}

enum SelectListType {
  PERSONS = 'persons',
  FAMILIES = 'families',
  NONE = 'none',
}

@Component({
  selector: 'family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent {

  public interfaceSelectPersonHint: Boolean;
  public selectListType;
  public currentSelectType: SelectListType;
  public formType;
  public currentFormType: FormType;
  public family: Family;
  public persons: Array<Person>;
  public currentPerson: Person;
  public childrenAmount: Array<number>;
  public personType: FormType;
  public personDialogVisible: boolean;

  constructor(private dataProvider: DataProvider) {
    this.interfaceSelectPersonHint = false;
    this.selectListType = SelectListType;
    this.currentSelectType = SelectListType.NONE;
    this.formType = FormType;
    this.currentFormType = null;
    this.family = new Family();
    this.family.children = [];
    this.currentPerson = new Person();
    this.persons = [];
    this.childrenAmount = [];
  }

  createNewPerson(personType: FormType): void {
    if (personType === FormType.FATHER) this.currentPerson.sex = Sex.Male;
    if (personType === FormType.MOTHER) this.currentPerson.sex = Sex.Female;
    if (personType === FormType.CHILD) this.currentPerson.sex = null;
    this.currentFormType = personType;
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
        this.addChild(person)
      }
    } else {
      this.currentPerson = new Person()
    }
    this.personDialogVisible = false;
  }

  saveFamily(): void {
    if (this.familyValid(this.family)) {
      // create new family
      (!this.family.id) ? this.dataProvider.addNewFamily(this.family) :
        this.dataProvider.changeFamily(this.family);
      // clean family
      this.family = new Family();
      this.persons = [];
      this.family.children = [];
    }

  }

  familyValid(family: Family): boolean {
    if (!family.father) family.father = null;
    if (!family.mother) family.mother = null;
    if (family.children && family.children.length === 0) family.children = null;

    let values = Object.values(family)
    for (let value of values) {
      if (Array.isArray(value)) {
        if (value.length > 0) return true
        continue
      }
      if (value !== null) return true
    }

    return false
  }

  addPersonsToCollection(): void {
    if (this.getFather()) this.persons.push(this.getFather());
    if (this.getMother()) this.persons.push(this.getMother());

    if (this.getChildren().length > 0) {
      for (let child of this.getChildren()) {
        this.persons.push(child);
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

  addChild(person: Person): void {
    this.family.children.push(person)
  }

  getFamilyList() {
    return this.dataProvider.getFamilies();
  }

  getPersonsList() {
    return this.dataProvider.getPersons();
  }

  setSelectListType(type: SelectListType) {
    this.currentSelectType = type;
  }

  selectExistPerson(personType: FormType, selectType: SelectListType) {
    this.setSelectListType(selectType);
    this.createNewPerson(personType);
  }

  setCurrentPerson(person: Person): void {
    if (this.personDialogVisible) {
      console.log(111)
      console.log(this.currentFormType)
      if (person.sex === Sex.Male && this.currentFormType === FormType.FATHER ||
          person.sex === Sex.Female && this.currentFormType === FormType.MOTHER ||
          this.currentFormType === FormType.CHILD) {
        this.currentPerson = person;
      }
    } else {
      this.interfaceSelectPersonHint = true;
      setTimeout(() => this.interfaceSelectPersonHint = false, 300);
    }
  }

  setCurrentFamily(family: Family): void {
    this.family = family;
  }


}

