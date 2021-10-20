import { Person } from "./person";

export class Family {
  public id?: number;
  public husband?: Person;
  public wife?: Person;
  public children?: Array<Person> = [];
  public note?: string;
}
