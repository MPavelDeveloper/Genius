import { LifeEvent } from "./life-event";

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export class Person {
  public id: number;
  public firstName: string;
  public lastName: string;
  public middleName: string;
  public age: number;
  public sex: Sex;
  public lifeEvent: Array<LifeEvent>;
  public familyId: number;
}
