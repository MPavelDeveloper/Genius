import { Person } from "./person";

export class Family {
  public id: number;
  public father: Person;
  public mother: Person;
  public children: Array<Person> = [];
}
