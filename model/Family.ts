import {Person} from "./Person";

export class Family{

  // props
  private _father:string;
  private _mother:string;
  private _children:Array<Person>;

  // get setter
  get father(): string {
    return this._father;
  }
  set father(value: string) {
    this._father = value;
  }

  get mother(): string {
    return this._mother;
  }
  set mother(value: string) {
    this._mother = value;
  }

  get children(): Array<Person> {
    return this._children;
  }
  set children(value: Array<Person>) {
    this._children = value;
  }


  // constr
  constructor(father:string, mother:string, children:Array<Person>) {
    this._father = father;
    this._mother = mother;
    this._children = children;
  }
}
