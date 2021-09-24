import {Injectable} from '@angular/core';

import {Family} from "../../model/family";
import {Person} from "../../model/person";


export abstract class DataProvider {
  abstract getPersons(): Array<Person>;

  abstract findPerson(personId: string): Person;

  abstract deletePerson(personId: string): void;

  abstract addPerson(person: Person): string;

  abstract getFamilies(): Array<Family>;

  abstract findFamily(familyId: string): Family;

  abstract deleteFamily(familyId: string): void;

  abstract addFamily(family: Family): string;
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

  public findPerson(personId: string): Person {
    if (personId) {
      return this.persons.find((p: Person) => p.id === personId);
    }
    return undefined
  }

  public findFamily(familyId: string): Family {
    if (familyId) {
      return this.families.find((family: Family) => family.id === familyId);
    }
    return undefined
  }


  public addFamily(family: Family): string {
    return "";
  }

  public addPerson(person: Person): string {
    console.log(person)
    return "";
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


  reloadData() {
    const data = JSON.parse(localStorage.getItem('jsonLineAge'));
    if (data) {
      this.persons = data.personList.map((obj: any) => this.mapPerson(obj))
      this.families = data.familyList.map((obj: any) => this.mapFamily(obj))
    }
  }
}
