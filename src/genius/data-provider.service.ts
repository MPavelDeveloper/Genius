import {Injectable} from '@angular/core';

import {Family} from "../model/family";
import {Person} from "../model/person";

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
  private readonly persons: Array<Person>;
  private readonly families: Array<Family>;

  constructor() {
    const data = JSON.parse(localStorage.getItem('json'));
    if (data) {
      this.persons = data.personList.map((obj: any) => this.mapPerson(obj))
      this.families = data.familyList.map((obj: any) => this.mapFamily(obj))
    }
  }


  private mapPerson(obj: any) {
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

  private mapFamily(obj: any) {
    let family = new Family();
    family.id = obj.id;
    family.father = obj.father;
    family.mother = obj.mother;
    family.children = obj.children;
    return family;
  }


  // id: string, father: Person, mother: Person, children: Array<Person>

  public findPerson(personId: string): Person {
    if (personId) {
      const person: Person = this.persons.find((p: Person) => p.id === personId);
      if (person) {
        return person;
      }
    }
    return null;
  }

  public findFamily(familyId: string): Family {
    if (familyId) {
      const family: Family = this.families.find((family: Family) => family.id === familyId);
      if (family) {
        return family;
      }
    }
    return null;
  }


  public addFamily(family: Family): string {
    return "";
  }

  public addPerson(person: Person): string {
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
}


// public parseJson(): Array<Array<Array<Person>>> {
//   if (this.validData()) {
//     let genusStruct: Array<Array<Array<Person>>> = [];
//
//     // add children (root Family) in geniusStruct
//     if (this.rootFamily.children.length > 0) {
//       // search person by id
//       const targetPerson = this.findPerson(this.rootFamily.children[0], this.persons);
//       // search related persons by familyId
//       const relatedPersons = this.findRelatedPersons(targetPerson.familyId, this.persons);
//       if (relatedPersons) {
//         genusStruct.push([relatedPersons]);
//       }
//     }
//
//     let hashPersons: Array<Person> = [];
//
//     // add parents (root Family) in hashPersons
//     if (this.rootFamily.father) {
//       const father = this.findPerson(this.rootFamily.father, this.persons);
//       if (father) {
//         hashPersons.push(father);
//       }
//     }
//     if (this.rootFamily.mother) {
//       const mother = this.findPerson(this.rootFamily.mother, this.persons);
//       if (mother) {
//         hashPersons.push(mother);
//       }
//     }
//
//     while (hashPersons.length > 0) {
//       // consolidator all related persons (one iteration)
//       let wrap: Array<Array<Person>> = [];
//
//       // consolidator target related persons (one person line)
//       let targetPersons: Array<Person> = hashPersons;
//       hashPersons = [];
//
//       // get each person's familyId and search related person
//       targetPersons.forEach((targetPerson: Person) => {
//         // CASE:
//         if (targetPerson.familyId) {
//           // each collection of related person's
//           const related: Person[] = this.findRelatedPersons(targetPerson.familyId, this.persons)
//           // check collection
//           if (related) {
//             wrap.push(related);
//
//             const hash: Array<string> = [];
//             related.forEach((person: Person) => {
//               if (person.familyId) {
//                 if (!hash.includes(person.familyId)) {
//                   hash.push(person.familyId);
//                   const family = this.findFamily(person.familyId, this.families)
//                   if (family) {
//                     if (family.father) {
//                       const target: Person = this.findPerson(family.father, this.persons)
//                       if (target) {
//                         hashPersons.push(target);
//                       }
//                     }
//                     if (family.mother) {
//                       const target: Person = this.findPerson(family.mother, this.persons)
//                       if (target) {
//                         hashPersons.push(target);
//                       }
//                     }
//                   }
//                 }
//               }
//             })
//           }
//         } else {
//           wrap.push([targetPerson]);
//         }
//       });
//
//       genusStruct.push(wrap)
//     }
//
//     return genusStruct;
//   }
//
//   return [];
// }

// private validData(): boolean {
//   return (
//     Boolean(this.rootFamily) &&
//     Boolean(this.families) &&
//     Boolean(this.persons)
//   )
// }

// private findRelatedPersons(familyID: string, personsList: Array<Person>): Array<Person> {
//   if (familyID) {
//     const result: Array<Person> = personsList.filter((person: Person) => person.familyId === familyID)
//     if (result.length > 0) {
//       return result
//     }
//   }
//   return null
// }
