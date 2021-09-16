import {Component} from '@angular/core';
import {Family} from "../model/Family";
import {Person} from "../model/Person";



@Component({
  selector: 'app-genius',
  templateUrl: './genius.component.html',
  styleUrls: ['./genius.component.scss']
})

export class GeniusComponent {
  data = this.getData();


  constructor() {
  }

  // [Object LineAge] get data in local storage
  getData() {
    // get json in local storage
    const data = localStorage.getItem('json')
    // check data type
    if (data) {
      return JSON.parse(data)
    }
  }


  parsData(): void {
    // checking for the presence object in data
    if (this.checkData()) {

      // data -> familyList -> family (each)
      this.data.familyList.forEach((family: Family) => {

        // checking for the presence object in target family;
        if (!this.isEmpty(family.children)) {
          // @ts-ignore
          family.children.forEach((personId: string) => {
            const person = this.getTargetPerson(personId)
                  if(!this.isEmpty(person)) {
                    console.log(person)
                  }
          })
        }
      })
    }
  }

  // [Array] get target person in data.personList
  getTargetPerson(personId: string): object {
    const person = this.data.personList.find((p: Person) => p.id === personId)
    if (typeof person === 'object') {
      return person
    }
    return {}
  }

  // [Boolean] checking for the presence object in data
  checkData(): boolean {
    return this.data.familyList !== null &&
      this.data.familyList.length !== 0 &&
      this.data.personList !== null &&
      this.data.personList.length !== 0
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

const elem = new GeniusComponent()
elem.parsData()
