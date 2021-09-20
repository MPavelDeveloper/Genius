import {Person} from "./Person";
import {Family} from "./Family";


export class LineAge {

  // props
  public familyList: Array<Family>;
  public personList: Array<Person>;

  // constr
  constructor( familyList: Array<Family>, personList: Array<Person>) {
    this.familyList = familyList;
    this.personList = personList;
  }


}
