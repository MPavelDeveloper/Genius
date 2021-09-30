import {Injectable} from '@angular/core';
import {Family} from "../../model/family";
import {Person} from "../../model/person";
import {LineAge} from "../../model/line-age";
import {GENEALOGY_STORAGE_KEY} from "../../json";

export abstract class DataProvider {
  abstract getPersons(): Array<Person>;

  abstract findPerson(personId: number): Person;

  abstract deletePerson(personId: string): void;

  abstract addPerson(person: Person): void;

  abstract getFamilies(): Array<Family>;

  abstract findFamily(familyId: number): Family;

  abstract deleteFamily(familyId: string): void;

  abstract addFamily(family: Family): void;
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

  public addFamily(family: Family): void {
    console.log(family);
    this.families.push(family);
    this.putDataFromLocalStorage();
  }

  public addPerson(person: Person): void {
    console.log(person)
    this.setPersonId(person)
    this.persons.push(person);
    this.putDataFromLocalStorage();
  }

  public putDataFromLocalStorage(): void {
    let data: LineAge = new LineAge(this.families, this.persons);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(data));
  }

  public setFamilyId(family: Family) {
    if (family.id) {

    }
  }

  public setPersonId(person: Person) {
  }

  public deleteFamily(familyId: string): void {
  }

  public deletePerson(personId: string): void {
  }

  public getFamilies(): Array<Family> {
    return this.families;
  }

  public getPersons(): Array<Person> {
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
