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
      if (this.rootFamily.children.length !== 0) {
        // search person by id
        const targetPerson = this.findTargetPerson(this.rootFamily.children[0], this.personsList);
        // search related persons by familyId
        const relatedPersons = this.findRelatedPersons(targetPerson.familyId, this.personsList);
        if (relatedPersons !== null) {
          this.genusStruct.push([(relatedPersons)]);
        }
      }

      let hash_persons: string[] = [];
      let hash_families: string[] = [];
      if (this.rootFamily.father) {
        hash_persons.push(this.rootFamily.father)
      }
      if (this.rootFamily.mother) {
        hash_persons.push(this.rootFamily.mother)
      }


      while (hash_persons.length !== 0) {
        let wrap: Array<Array<Person>> = []


        let targetPersons: Array<Person> = []
        // get target person's: object's
        hash_persons.forEach((id: string) => {
          const person = this.findTargetPerson(id, this.personsList)
          if (person) {
            targetPersons.push(person)
          }
        })
        // clean hash with persons id:string
        hash_persons = []

        // get each person's familyId and find targets person
        targetPersons.forEach((targetPerson: Person) => {
          if (targetPerson.familyId !== null) {
            hash_families.push(targetPerson.familyId)
          }
        })


        if (hash_families.length !== 0) {
          // search related person's by familyID
          hash_families.forEach((familyID: string) => {
            const related: Person[] = this.findRelatedPersons(familyID, this.personsList)
            if (related !== null && related.length !== 0) {
              wrap.push(related)
              console.log(wrap)

              related.forEach((person:Person) => {
                if(person.familyId !== null) {
                  // hash_persons()
                }
              })
            }
          })
        }

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

  findTargetFamily(familyId: string, data: LineAge): Family {
    if (typeof familyId === 'string') {
      const family: Family = data.familyList.find((f: Family) => f.id === familyId);
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
