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
  public currentChildIndex: number;
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
    this.currentChildIndex = null;
    this.persons = [];
  }

  createNewParent(personType: FormType): void {
    if(this.personDialogVisible) {
      this.currentPerson = new Person();
      this.personDialogVisible = false;
    }
    if (personType === FormType.FATHER) this.currentPerson.sex = Sex.Male;
    if (personType === FormType.MOTHER) this.currentPerson.sex = Sex.Female;
    this.currentFormType = personType;
    this.getChildren()[0] === this.currentPerson;
    this.personDialogVisible = true;
    this.personType = personType;
  }

  createNewChild(index: number):void {
    this.currentChildIndex = index;
    this.currentPerson = this.getChild(index);
    this.personDialogVisible = true;
    this.personType = FormType.CHILD;
    this.currentFormType = this.personType;
  }

  addChildTemplate(): void {
    this.currentPerson = new Person();
    this.addChild(this.currentPerson);
  }

  addChild(person: Person): void {
    this.family.children.push(person)
  }

  addPersonInFamily(person: Person): void {
    console.log(person)
    console.log(this.currentChildIndex)
    console.log(this.getChildren())
    console.log(this.currentFormType)
    if(person === null && this.currentFormType === FormType.CHILD) {
      console.log(111)
      this.getChildren()[this.currentChildIndex] = new Person();
    }
    if (person && Object.keys(person).length > 0) {
      if (this.personType === FormType.FATHER) {
        this.setFather(person)
      } else if (this.personType === FormType.MOTHER) {
        this.setMother(person)
      }
    }

    console.log(this.family.children)
    this.currentPerson = new Person()
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



  deleteChild(index: number): void {
    this.getChildren().splice(index,1);
    if(this.getChildren().length === 0) this.personDialogVisible = false;
    console.log(this.family.children);
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
      this.createNewParent(FormType.FATHER)

    } else if (personType === FormType.MOTHER) {
      this.currentPerson = this.getMother()
      this.createNewParent(FormType.MOTHER)
    }
  }

  getFather(): Person {
    return this.family.father;
  }

  getMother(): Person {
    return this.family.mother;
  }

  getChild(index: number): Person {
    return this.getChildren()[index];
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

  checkChild(index: number): Boolean {
    return Object.keys(this.getChild(index)).length > 0
  }

  getCompleteChildrenAmount(): number {
    let amount = 0;
    this.getChildren().forEach(child => {
      if(Object.keys(child).length > 0) amount++
    })

    return amount + 1;
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
    this.createNewParent(personType);
  }

  setCurrentPerson(person: Person): void {
    if (this.personDialogVisible) {
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

