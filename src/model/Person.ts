// import {Family} from "./Family";
import {LifeEvent} from "./LifeEvent";

export enum Sex {
  man = 'male',
  woman = 'female',
}

export class Person {

  // props
  public id: string;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public age: number;
  public sex: Sex;
  public lifeEvent: Array<LifeEvent>;
  // private family: Family;


  // const
  //
  constructor(id: string, firstName: string, lastName: string, middleName: string, age: number, sex: Sex,lifeEvent: Array<LifeEvent>) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.age = age;
    this.sex = sex;
    // this.family = family;
    this.lifeEvent = lifeEvent;
  }


  // // getters  setters
  // getId(): string {
  //   return this.id;
  // }
  //
  // setId(value: string) {
  //   this.id = value;
  // }
  //
  // getFirstName(): string {
  //   return this.firstName;
  // }
  //
  // getLastName(): string {
  //   return this.lastName;
  // }
  //
  // getMiddleName(): string {
  //   return this.middleName;
  // }
  //
  // getAge(): number {
  //   return this.age;
  // }
  //
  // getSex(): Sex {
  //   return this.sex;
  // }
  //
  // getLifeEvent(): Array<LifeEvent> {
  //   return this.lifeEvent;
  // }

  // getFamily(): Family {
  //   return this.family;
  // }
}


// test ///
//   console.log(new Person('3', 'John', 'Nech','Jonson', 23, 'm', null, null, new Family(), []))
