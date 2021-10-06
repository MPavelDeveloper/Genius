import {Injectable} from '@angular/core';
import {Family} from "../../model/family";
import {Person} from "../../model/person";
import {LineAge} from "../../model/line-age";
import {GENEALOGY_STORAGE_KEY} from "../../json";

export abstract class DataProvider {
  abstract getPersons(): Array<Person>;

  abstract getFamilies(): Array<Family>;

  abstract findPerson(personId: number): Person;

  abstract findFamily(familyId: number): Family;

  abstract addNewPerson(person: Person): void;

  abstract addNewFamily(family: Family): void;

  abstract deletePerson(personId: string): void;

  abstract deleteFamily(familyId: string): void;

  abstract changeFamily(family: Family): void;

}

@Injectable({
  providedIn: 'root',
})

export class LocalStorageDataProvider implements DataProvider {
  public persons: Array<Person>;
  public families: Array<Family>;

  constructor() {
    this.reloadData();
  }

  public mapPerson(obj: any): Person {
    let person = new Person();
    person.id = obj.id;
    person.firstName = obj.firstName;
    person.lastName = obj.lastName;
    person.middleName = obj.middleName;
    person.age = obj.age;
    person.sex = obj.sex;
    person.lifeEvent = obj.lifeEvent;
    person.familyId = obj.familyId;
    return person;
  }

  public mapFamily(obj: any): Family {
    let family = new Family();
    family.id = obj.id;
    family.father = obj.father;
    family.mother = obj.mother;
    family.children = obj.children;
    return family;
  }

  public findPerson(personId: number): Person {
    if (personId) {
      return this.persons.find((p: Person) => p.id === personId);
    }
    return undefined
  }

  public findFamily(familyId: number): Family {
    if (familyId) {
      return this.families.find((family: Family) => family.id === familyId);
    }
    return undefined
  }

  private changeExistFamilyChildren(person: Person): void {
    const targetFamily = this.findFamily(person.familyId);
    if (targetFamily) {
      (targetFamily.children === null) ? targetFamily.children = [person] :
        targetFamily.children.push(person);
    }
  }

  public addNewFamily(family: Family): void {
    family.id = this.getNewFamilyID();
    this.setPersonsId(family);
    this.families.push(family);
    this.putData();
  }

  public addNewPerson(person: Person): void {
    person.id = this.getNewPersonID();
    this.persons.push(person);
  }

  public changeFamily(family: Family): void {
    this.setPersonsId(family);
    this.putData();
  }

  private setPersonsId(family: Family): void {
    if (family.father && !family.father.id) {
      this.addNewPerson(family.father);
    }
    // add in target family as child
    // if (family.father && family.father.familyId) {
    //   this.changeExistFamilyChildren(family.father)
    // }
    if (family.mother && !family.mother.id) {
      this.addNewPerson(family.mother);
    }
    // add in target family as child
    // if (family.mother && family.mother.familyId) {
    //   this.changeExistFamilyChildren(family.mother)
    // }
    if (family.children) {
      family.children.forEach(child => {
        child.familyId = family.id;
        if (!child.id) {
          this.addNewPerson(child);
        }
      });
    }
  }

  private getNewPersonID(): number {
    const currentId = this.persons.reduce((previusId: number, item: Person) => {
      if (previusId < item.id) return item.id
      return previusId
    }, 0);

    return currentId + 1;
  }

  private getNewFamilyID(): number {
    const currentId = this.families.reduce((previusId: number, item: Family) => {
      if (previusId < item.id) return item.id
      return previusId
    }, 0);

    return currentId + 1;
  }

  private putData(): void {
    let data: LineAge = new LineAge(this.families, this.persons);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(data));
  }

  public deleteFamily(familyId: string): void {
  }

  public deletePerson(personId: string): void {
  }

  public getFamilies(): Array<Family> {
    // this.reloadData()
    return this.families;
  }

  public getPersons(): Array<Person> {
    // this.reloadData()
    return this.persons;
  }

  public reloadData() {
    const data = JSON.parse(localStorage.getItem(GENEALOGY_STORAGE_KEY));
    if (data) {
      this.persons = data.personList.map((obj: any) => this.mapPerson(obj));
      this.families = data.familyList.map((obj: any) => this.mapFamily(obj));
    }
  }
}
