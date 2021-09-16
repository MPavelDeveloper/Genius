import {Person} from "./Person";
import {Family} from "./Family";


export class LineAge {

  // props
  public familyList: Array<Family> | null;
  public personList: Array<Person> | null;

  // constr
  constructor( familyList: Array<Family> | null, personList: Array<Person> | null) {
    this.familyList = familyList;
    this.personList = personList;
  }


}
