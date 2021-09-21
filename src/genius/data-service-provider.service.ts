import { Injectable } from '@angular/core';

import {Family} from "../model/family";
import {Person} from "../model/person";
import {LineAge} from "../model/line-age";

@Injectable({
  providedIn: 'root',
})

export class DataServiceProvider {
  public rootFamily: Family;
  public personsList: Array<Person>;
  public familyList: Array<Family>;
  public genusStruct: Array<Array<Array<Person>>>;

  constructor() {
    const data: LineAge = JSON.parse(this.getJson());
    if (this.checkJson(data)) {
      this.rootFamily = data.familyList[0];
      this.personsList = data.personList;
      this.familyList = data.familyList;
      this.genusStruct = [];
    }
  }


  validData(): boolean {

    return (
      Boolean(this.rootFamily) &&
      Boolean(this.familyList) &&
      Boolean(this.personsList)
    )
  }

  getJson(): string{
    return localStorage.getItem('json');
  }

  checkJson(data: LineAge): boolean {

    return (
      Boolean(data) &&
      Boolean(data.familyList) &&
      Array.isArray(data.familyList) &&
      data.familyList.length > 0 &&
      Boolean(data.personList) &&
      Array.isArray(data.personList) &&
      data.personList.length > 0)
  }

  parsJson(): void {
    if (this.validData()) {

      // add children (root Family) in geniusStruct
      if (this.rootFamily.children.length > 0) {
        // search person by id
        const targetPerson = this.findPerson(this.rootFamily.children[0], this.personsList);
        // search related persons by familyId
        const relatedPersons = this.findRelatedPersons(targetPerson.familyId, this.personsList);
        if (relatedPersons) {
          this.genusStruct.push([relatedPersons]);
        }
      }


      let hash_persons: Array<Person> = [];

      // add parents (root Family) in hash_persons
      if (this.rootFamily.father) {
        const father = this.findPerson(this.rootFamily.father, this.personsList)
        if (father) {
          hash_persons.push(father)
        }
      }
      if (this.rootFamily.mother) {
        const mother = this.findPerson(this.rootFamily.mother, this.personsList)
        if (mother) {
          hash_persons.push(mother)
        }
      }


      while (hash_persons.length > 0) {
        // consolidator all related persons (one iteration)
        let wrap: Array<Array<Person>> = [];

        // consolidator target related persons (one person line)
        let targetPersons: Array<Person> = hash_persons;
        hash_persons = [];

        // get each person's familyId and search related person
        targetPersons.forEach((targetPerson: Person) => {
          // CASE:
          if (targetPerson.familyId) {
            // each collection of related person's
            const related: Person[] = this.findRelatedPersons(targetPerson.familyId, this.personsList)
            // check collection
            if (related) {
              wrap.push(related)

              const hash: Array<string> = []
              related.forEach((person: Person) => {
                if (person.familyId) {
                  if (!hash.includes(person.familyId)) {
                    hash.push(person.familyId)
                    const family = this.findFamily(person.familyId, this.familyList)
                    if (family) {
                      if (family.father) {
                        const target: Person = this.findPerson(family.father, this.personsList)
                        if (target) {
                          hash_persons.push(target)
                        }
                      }
                      if (family.mother) {
                        const target: Person = this.findPerson(family.mother, this.personsList)
                        if (target) {
                          hash_persons.push(target)
                        }
                      }
                    }
                  }
                }
              })
            }
          } else {
            wrap.push([targetPerson])
          }
        })

        this.genusStruct.push(wrap)

      }


    }


  }


  findPerson(personId: string, personsList: Array<Person>): Person {
    if (personId) {
      const person: Person = personsList.find((p: Person) => p.id === personId);
      if (person) {
        return person;
      }
    }
    return null;
  }

  findFamily(familyId: string, familyList: Array<Family>): Family {
    if (familyId) {
      const family: Family = familyList.find((f: Family) => f.id === familyId);
      if (family) {
        return family;
      }
    }
    return null;
  }

  findRelatedPersons(familyID: string, personsList: Array<Person>): Array<Person> {
    if (familyID) {
      const result: Array<Person> = personsList.filter((person: Person) => person.familyId === familyID)
      if (result.length > 0) {
        return result
      }
    }
    return null
  }


}
