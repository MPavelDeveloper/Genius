import {Family} from "./Family";

class Person{

  // props
  private _id:string;
  private _firstName:string;
  private _lastName:string;
  private _middleName:string;
  private _age:number;
  private _sex: 'm' | 'w';
  private _lifeEvent:Array<Object>;
  private _dateBirth:string;
  private _dateDeath:string;
  private _family:Family;


  // getters  setters
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }
  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }
  set lastName(value: string) {
    this._lastName = value;
  }

  get middleName(): string {
    return this._middleName;
  }
  set middleName(value: string) {
    this._middleName = value;
  }

  get age(): number {
    return this._age;
  }
  set age(value: number) {
    this._age = value;
  }

  get sex(): "m" | "w" {
    return this._sex;
  }
  set sex(value: "m" | "w") {
    this._sex = value;
  }

  get lifeEvent(): Array<Object> {
    return this._lifeEvent;
  }
  set lifeEvent(value: Array<Object>) {
    this._lifeEvent = value;
  }

  get dateBirth(): string {
    return this._dateBirth;
  }
  set dateBirth(value: string) {
    this._dateBirth = value;
  }

  get dateDeath(): string {
    return this._dateDeath;
  }
  set dateDeath(value: string) {
    this._dateDeath = value;
  }

  get family(): Family {
    return this._family;
  }
  set family(value: Family) {
    this._family = value;
  }


  // const
  constructor(id:string, firstName:string, lastName:string, middleName:string, age:number, sex: 'm' | 'w', dateBirth:string, dateDeath:string, family:Family, lifeEvent:Array<Object>) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._middleName = middleName;
    this._age = age;
    this._sex = sex;
    this._dateBirth = dateBirth;
    this._dateDeath = dateDeath;
    this._family = family;
    this._lifeEvent = lifeEvent;
  }
}


// test
//   console.log(new Person('3', 'John', 'Nech','Jonson', 23, 'm', null, null, new Family(), []))
