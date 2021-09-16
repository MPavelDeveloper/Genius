import {LifeEvent} from "./LifeEvent";

export enum Sex {
  man = 'male',
  woman = 'female',
}

export class Person {

  // props
  public id: string;
  public firstName: string;
  public lastName: string | null;
  public middleName: string | null;
  public age: number | null;
  public sex: Sex;
  public lifeEvent: Array<LifeEvent> | null;
  public familyId: string | null;


  // const
  constructor(id: string, firstName: string, lastName: string | null, middleName: string | null, age: number | null, sex: Sex,lifeEvent: Array<LifeEvent> | null, familyId: string | null) {
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
