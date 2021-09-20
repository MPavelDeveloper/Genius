import {Component, OnInit} from '@angular/core';
import {Family} from "../model/Family";
import {Person} from "../model/Person";
import {LineAge} from "../model/LineAge";


@Component({
  selector: 'app-genius',
  templateUrl: './genius.component.html',
  styleUrls: ['./genius.component.scss']
})

export class GeniusComponent implements OnInit {
  data: any;
  struct: any;


  constructor() {
    this.data = this.getJSON()
    this.struct = [];
  }

  ngOnInit() {
    this.parsData()
    console.log(this.data)
    console.log(this.struct)
  }

  getJSON() {
    return localStorage.getItem('json')
  }

  // [Object LineAge] get data in local storage
  // getData() {
    // get json in local storage
    // const data = localStorage.getItem('json')
    // check data type
  //   if (data) {
  //     return JSON.parse(data)
  //   }
  // }


  parsData(): void {
    // data desserialization
    const data = JSON.parse(this.data)
    console.log(data)

    // [VALID] <JSON> checking for the presence object in data
    if (this.checkData(data)) {

      // [ITER] data -> familyList -> family (each)
      data.familyList.forEach((family: Family) => {

        // 1. Children
        // [VALID] checking for the presence object in target family;
        if (!this.isEmpty(family.children)) {
          const wrap_heirs: Person[] = []
          // @ts-ignore
          // [ITER] each child
          family.children.forEach((personId: string) => {
            const targetPerson: Person | {} = this.getTargetPerson(personId, data)
            if (!this.isEmpty(targetPerson)) {
              // @ts-ignore
              wrap_heirs.push(targetPerson)
            }
          })
          this.struct.push(wrap_heirs)
        }

        // 2. Mother and mother's relatives (sisters, brothers)
        if (!this.isEmpty(family.mother)) {
          const wrap_mRelatives: Person[] = []
          // @ts-ignore
          // [Person] get target person
          const targetPerson: Person | {} = this.getTargetPerson(family.mother, data)
          // get target family
          if (!this.isEmpty(targetPerson)) {
            // @ts-ignore
            wrap_mRelatives.push(targetPerson)
            // @ts-ignore
            // [Family] get target family
            const targetFamily: Family | {} = this.getTargetFamily(targetPerson.familyId, data)

            // @ts-ignore
            if (!this.isEmpty(targetFamily) && !this.isEmpty(targetFamily.children)) {

              // @ts-ignore
              targetFamily.children.forEach(personId => wrap_mRelatives.push(this.getTargetPerson(personId, data)))
              // @ts-ignore
              targetFamily.children = null;
            }

          }
          if (!this.isEmpty(wrap_mRelatives)) {
            // @ts-ignore
            this.struct.push(wrap_mRelatives)

          }
        }

        // 3. Father and father relatives (sisters, brothers)
        if (!this.isEmpty(family.father)) {
          const wrap_fRelatives: Person[] = []
          // @ts-ignore
          // [Person] get target person
          const targetPerson: Person | {} = this.getTargetPerson(family.father, data)
          // get target family
          if (!this.isEmpty(targetPerson)) {
            // @ts-ignore
            wrap_fRelatives.push(targetPerson)
            // @ts-ignore
            // [Family] get target family
            const targetFamily: Family | {} = this.getTargetFamily(targetPerson.familyId, data)

            // @ts-ignore
            if (!this.isEmpty(targetFamily) && !this.isEmpty(targetFamily.children)) {

              // @ts-ignore
              targetFamily.children.forEach(personId => wrap_fRelatives.push(this.getTargetPerson(personId, data)))
              // @ts-ignore
              targetFamily.children = null;
            }

          }
          if (!this.isEmpty(wrap_fRelatives)) {
            // @ts-ignore
            this.struct.push(wrap_fRelatives)
          }
        }

      })
    }
  }


  // [Person | {}] get target person in data.personList
  getTargetPerson(personId: string, data: LineAge): Person | object {
    if(!this.isEmpty(personId)) {
      // @ts-ignore
      const person: Person = data.personList.find((p: Person) => p.id === personId)
      if (!this.isEmpty(person)) {
        return person
      }
    }
    return {}
  }

  // [Family | {}] get target family in data.familyList
  getTargetFamily(familyId: string, data: LineAge): Family | object {
    if(!this.isEmpty(familyId)) {
      // @ts-ignore
      const family: Family = data.familyList.find((f: Family) => f.id === familyId)
      if (!this.isEmpty(family)) {
        return family
      }
    }
    return {}
  }

  // [Boolean] VALIDATION JSON checking for the presence object in data
  checkData(data: LineAge): boolean {
    return data !== null &&
      data.familyList !== null &&
      data.familyList.length !== 0 &&
      data.personList !== null &&
      data.personList.length !== 0
  }

  // [Boolean] checking an object for the emptiness
  isEmpty(item: any): boolean {

    // case : Array
    if (Array.isArray(item)) {
      return item.length === 0

      // case : Object
    } else if (typeof item === 'object' && item !== null) {
      return Object.keys(item).length === 0

      // case : Simple Type
    } else {
      return item === undefined || item === null
    }
  }
}

