import {Injectable} from '@angular/core';
import {DataServiceProvider} from './dataServiceProvider.service'
import {Family} from "../model/Family";
import {Person} from "../model/Person";
import {LineAge} from "../model/LineAge";


@Injectable({
  providedIn: 'root'
})


// ------- / Service Goal: parse JSON / ---------

export class ParsService {
  // props
  public rootFamily: Family;
  public personsList: Person[];
  public familyList: Family[];
  public genusStruct: Array<Array<Array<Person>>>;

  // constr
  constructor(private dataService: DataServiceProvider) {
    const data: LineAge = JSON.parse(this.dataService.getJSON());
    if (this.checkJSON(data)) {
      this.rootFamily = data.familyList[0];
      this.personsList = data.personList;
      this.familyList = data.familyList;
      this.genusStruct = [];
    }
  }


  // methods
  parsData(): void {
    if (this.validData()) {

      // add children (root Family) in geniusStruct
      if (this.rootFamily.children.length !== 0) {
        // search person by id
        const targetPerson = this.findTargetPerson(this.rootFamily.children[0], this.personsList);
        // search related persons by familyId
        const relatedPersons = this.findRelatedPersons(targetPerson.familyId, this.personsList);
        if (relatedPersons !== null) {
          this.genusStruct.push([(relatedPersons)]);
        }
      }


      let hash_persons: Person[] = [];
      let hash_families: Family[] = [];

      // add parents (root Family) in hash_persons
      if (this.rootFamily.father) {
        const father = this.findTargetPerson(this.rootFamily.father, this.personsList)
        if (father) {
          hash_persons.push(father)
        }
      }
      if (this.rootFamily.mother) {
        const mother = this.findTargetPerson(this.rootFamily.mother, this.personsList)
        if (mother) {
          hash_persons.push(mother)
        }
      }


      while (hash_persons.length !== 0) {
        // consolidator all related persons (one iteration)
        let wrap: Array<Array<Person>> = [];

        // consolidator target related persons (one person line)
        let targetPersons: Array<Person> = hash_persons;
        hash_persons = [];

        // get each person's familyId and search related person
        targetPersons.forEach((targetPerson: Person) => {
          // CASE:
          if (targetPerson.familyId !== null) {
            // each collection of related person's
            const related: Person[] = this.findRelatedPersons(targetPerson.familyId, this.personsList)
            // check collection
            if (related) {
              wrap.push(related)
              const hash: string[] = []
              related.forEach((person: Person) => {
                if (person.familyId !== null) {
                  if(!hash.includes(person.familyId)) {
                    hash.push(person.familyId)
                    const family = this.findTargetFamily(person.familyId, this.familyList)
                    if (family) {
                      if (family.father) {
                        const target: Person = this.findTargetPerson(family.father, this.personsList)
                        if (target) {
                          hash_persons.push(target)
                        }
                      }
                      if (family.mother) {
                        const target: Person = this.findTargetPerson(family.mother, this.personsList)
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

  // one familyId = [child, child, ...]
  findRelatedPersons(familyID: string, personsList: Person[]): Person[] {
    if (typeof familyID === "string" && Boolean(familyID)) {
      const result: Person[] = personsList.filter((person: Person) => person.familyId === familyID)
      if (result.length !== 0) {
        return result
      }
    }
    return null
  }

  findTargetPerson(personId: string, personsList: Person[]): Person {
    if (typeof personId === 'string') {
      const person: Person = personsList.find((p: Person) => p.id === personId);
      if (person) {
        return person;
      }
    }
    return null;
  }

  findTargetFamily(familyId: string, familyList: Family[]): Family {
    if (typeof familyId === 'string') {
      const family: Family = familyList.find((f: Family) => f.id === familyId);
      if (family) {
        return family;
      }
    }
    return null;
  }

  checkJSON(data: LineAge): boolean {

    return (
      Boolean(data) &&
      Array.isArray(data.familyList) &&
      data.familyList.length !== 0 &&
      Array.isArray(data.personList) &&
      data.personList.length !== 0)
  }

  validData(): boolean {

    return (
      Boolean(this.rootFamily) &&
      Boolean(this.personsList) &&
      Boolean(this.familyList)
    )
  }
}
