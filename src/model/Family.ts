import {Person} from "./Person";

export class Family {

  // props
  public father: Person;
  public mother: Person;
  public children: Array<Person>;

  // constr
  constructor(father: Person, mother: Person, children: Array<Person>) {
    this.father = father;
    this.mother = mother;
    this.children = children;
  }

  // get setter
  // getFather(): Person {
  //   return this.father;
  // }
  //
  // getMother(): Person {
  //   return this.mother;
  // }
  //
  // getChildren(): Array<Person> {
  //   return this.children;
  // }
}
