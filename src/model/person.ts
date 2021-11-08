import { LifeEvent } from "./life-event";

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export class Person {
  public id?: number;
  public firstName: string;
  public lastName?: string;
  public middleName?: string;
  public maidenName?: string;
  public age?: number;
  public sex: Sex;
  public lifeEvents?: Array<LifeEvent>;
  public familyId?: number;
  public place?: string;
  public note?: string;
  public occupation?: string;
}
