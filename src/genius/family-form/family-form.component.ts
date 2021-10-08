import {Component} from '@angular/core';
import {Family} from "../../model/family";
import {DataProvider} from "../services/data-provider.service";
import {Person, Sex} from "../../model/person";
import {PersonFormTemplateVersion} from "../person-form/person-form.component";

export enum FormType {
  FATHER = 'father',
  MOTHER = 'mother',
  CHILD = 'child',
}

export enum SelectListType {
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

  public personComponentTemplate;
  public selectListType;
  public currentSelectType: SelectListType;
  public interfaceSelectPersonHint: Boolean;
  public personType;
  public currentPerson: Person;
  public currentPersonType: FormType;
  public family: Family;
  public currentChildIndex: number;
  public personDialogVisible: boolean;

  constructor(private dataProvider: DataProvider) {
    this.personComponentTemplate = PersonFormTemplateVersion;
    this.selectListType = SelectListType;
    this.currentSelectType = SelectListType.NONE;
    this.interfaceSelectPersonHint = false;
    this.personType = FormType;
    this.currentPerson = new Person();
    this.currentPersonType = null;
    this.family = new Family();
    this.family.children = [];
    this.currentChildIndex = null;
  }

  createNewParent(personType: FormType): void {
    if (this.personDialogVisible) {
      this.currentPerson = new Person();
      this.personDialogVisible = false;
    }
    if (personType === FormType.FATHER) {
      this.currentPerson.sex = Sex.Male;
    } else {
      this.currentPerson.sex = Sex.Female;
    }
    this.currentPersonType = personType;
    this.personDialogVisible = true;
  }

  createNewChild(index: number): void {
    this.currentChildIndex = index;
    this.currentPerson = this.getChild(index);
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
  }

  selectExistParent(personType: FormType, selectType: SelectListType) {
    this.setSelectListType(selectType);
    this.createNewParent(personType);
  }

  selectExistChild(index: number, selectType: SelectListType) {
    this.setSelectListType(selectType);
    this.currentChildIndex = index;
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
  }

  changeParent(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.currentPerson = this.getFather()
      this.createNewParent(FormType.FATHER)

    } else if (personType === FormType.MOTHER) {
      this.currentPerson = this.getMother()
      this.createNewParent(FormType.MOTHER)
    }
  }

  changeChild(index: number) {
    this.currentChildIndex = index;
    this.currentPerson = this.getChild(index);
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
  }

  deleteParent(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.setFather(null)
    } else if (personType === FormType.MOTHER) {
      this.setMother(null)
    }
  }

  deleteChild(index: number): void {
    this.getChildren().splice(index, 1);
    if (this.getChildren().length === 0) this.personDialogVisible = false;
  }

  saveFamily(): void {
    if (this.familyValid(this.family)) {
      // create new family
      console.log(this.family);
      console.log(`validation`);
      (!this.family.id) ? this.dataProvider.addNewFamily(this.family) :
        this.dataProvider.changeFamily(this.family);
      // clean family
      this.family = new Family();
      this.family.children = [];
    }

    this.family.children = [];
  }

  familyValid(family: Family): boolean {
    console.log('check children');
    if (this.getCompleteChildrenAmount() > 0) {
      return true;
    }
    console.log('check parents');
    let familyValues = Object.values(family)
    for (let value of familyValues) {
      if (Array.isArray(value)) continue;
      if (value) return true;
    }
    console.log('check false');
    return false;
  }

  addPersonInFamily(person: Person): void {
    if (this.currentPersonType === FormType.CHILD && person === null) {
      this.getChildren()[this.currentChildIndex] = new Person();
    }

    if (person && Object.keys(person).length > 0) {
      if (this.currentPersonType === FormType.FATHER) {
        this.setFather(person)
      } else if (this.currentPersonType === FormType.MOTHER) {
        this.setMother(person)
      }
    }

    this.currentPerson = new Person()
    this.personDialogVisible = false;
  }

  addChildTemplate(): void {
    this.currentPerson = new Person();
    this.addChild(this.currentPerson);
  }

  addChild(person: Person): void {
    this.family.children.push(person)
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

  checkChild(index: number): Boolean {
    return Object.keys(this.getChild(index)).length > 0
  }

  getCompleteChildrenAmount(): number {
    let amount = 0;
    if (this.getChildren()) {
      this.getChildren().forEach(child => {
        if (Object.keys(child).length > 0) amount++;
      })
    }

    return amount;
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

  setCurrentPerson(person: Person): void {
    if (this.personDialogVisible) {
      if (person.sex === Sex.Male && this.currentPersonType === FormType.FATHER ||
        person.sex === Sex.Female && this.currentPersonType === FormType.MOTHER ) {
        this.currentPerson = person;
      } else if (this.currentPersonType === FormType.CHILD) {
        this.currentPerson = person;
        this.getChildren()[this.currentChildIndex] = person;
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

