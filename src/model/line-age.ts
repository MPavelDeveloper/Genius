import { Family } from "./family";
import { Person } from "./person";

export class LineAge {

  public familyList: Array<Family>;
  public personList: Array<Person>;

  constructor(familyList: Array<Family>, personList: Array<Person>) {
    this.familyList = familyList;
    this.personList = personList;
  }
}
