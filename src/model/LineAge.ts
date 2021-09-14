import {Person} from "./Person";
import {Family} from "./Family";


class LineAge {

  // props
  private familyList: Array<Family>;
  private personList: Array<Person>;

  // constr
  constructor(familyList: Array<Family>, personList: Array<Person>) {
    this.familyList = familyList;
    this.personList = personList;
  }

  // getters setters
  getFamilyList(): Array<Family> {
    return this.familyList;
  }

  getPersonList(): Array<Person> {
    return this.personList;
  }
}
