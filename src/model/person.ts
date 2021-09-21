import {LifeEvent} from "./life-event";

export enum Sex {
  Male = 'male',
  Female = 'female',
}

export class Person {

  public id: string;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public age: number;
  public sex: Sex;
  public lifeEvent: Array<LifeEvent>;
  public familyId: string;


  constructor(id: string, firstName: string, lastName: string, middleName: string, age: number, sex: Sex,lifeEvent: Array<LifeEvent>, familyId: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.age = age;
    this.sex = sex;
    this.familyId = familyId;
    this.lifeEvent = lifeEvent;
  }

}
