import {Component} from "@angular/core";
import {Family} from "../../model/family";
import {Person, Sex} from "../../model/person";
import {PersonFormTemplateVersion} from "../person-form/person-form.component";
import {DataProvider} from "../services/data-provider";

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
  public persons: Array<Person>;
  public personType;
  public currentPerson: Person;
  public currentPersonType: FormType;
  public families: Array<Family>;
  public family: Family;
  public sex;
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
    this.sex = Sex;
  }

  createNewParent(personType: FormType): void {
    if (this.personDialogVisible) {
      this.currentPerson = new Person();
      this.personDialogVisible = false;
    }
    if (personType === FormType.FATHER) {
      this.currentPerson.sex = Sex.MALE;
    } else {
      this.currentPerson.sex = Sex.FEMALE;
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
    this.getPersonsList()
  }

  selectExistChild(index: number, selectType: SelectListType) {
    this.setSelectListType(selectType);
    this.currentChildIndex = index;
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
    this.getPersonsList();
  }

  changeParent(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.currentPerson = this.getFather()
      this.currentPersonType = personType;
      this.personDialogVisible = true;
      this.currentPerson.sex = Sex.MALE;

    } else if (personType === FormType.MOTHER) {
      this.currentPerson = this.getMother()
      this.currentPersonType = personType;
      this.personDialogVisible = true;
      this.currentPerson.sex = Sex.FEMALE;
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
      this.personDialogVisible = false;
    } else if (personType === FormType.MOTHER) {
      this.setMother(null)
      this.personDialogVisible = false;
    }
    this.getPersonsList();
    this.getFamilyList();
  }

  deleteChild(index: number): void {
    this.getChildren().splice(index, 1);
    if (this.getChildren().length === 0) this.personDialogVisible = false;
  }

  saveFamily(): void {
    if (this.familyValid(this.family)) {
      // create new or change exist person
      let persons = this.scanFamily(this.family);
      persons.forEach((person: Person) => {
        (person.id) ? this.dataProvider.changePerson(person) :
          this.dataProvider.addNewPerson(person);
      });
      // create new or change exist family
      (this.family.id) ? this.dataProvider.changeFamily(this.family) :
        this.dataProvider.addNewFamily(this.family);
      // clean family
      this.family = new Family();
      this.family.children = [];
      // refresh data
      setTimeout(() => {
        this.getPersonsList();
        this.getFamilyList();
      }, 300)
    }
    this.family.children = [];
  }

  scanFamily(family: Family): Array<Person> {
    let persons: Array<Person> = [];
    let values = Object.values(family);
    for (let value of values) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          value.forEach(person => persons.push(person));
        }
        continue;
      }
      if (value instanceof Person) persons.push(value);
    }

    return persons;
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
      if (value instanceof Person) return true;
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
    this.dataProvider.getFamilies().subscribe(res => this.families = res,
      (err) => {
      console.error(err)
        if (err.error?.status >= 400) {
          console.error(new Error(`Error status: ${err.error?.status}\n Error message: ${err.error?.message}\n Error path: ${err.error?.path}\n`));
        }
      });
  }

  getPersonsList() {
    this.dataProvider.getPersons().subscribe(res => this.persons = res,
      (err) => {
        if (err.error.status >= 400) {
          console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
        }
      });
  }

  setSelectListType(type: SelectListType) {
    this.currentSelectType = type;
  }

  setCurrentPerson(person: Person): void {
    if (this.personDialogVisible) {
      if (person.sex === Sex.MALE && this.currentPersonType === FormType.FATHER ||
        person.sex === Sex.FEMALE && this.currentPersonType === FormType.MOTHER) {
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

  cleanForm(): void {
    this.interfaceSelectPersonHint = false;
    this.currentPerson = new Person();
    this.family = new Family();
    this.family.children = [];
    this.currentChildIndex = null;
    this.personDialogVisible = false;
  }

}

