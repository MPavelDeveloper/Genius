import { Person } from "./person";
import {FamilyEvent} from "./family-event";

export class Family {
  public id?: number;
  public husband?: Person;
  public wife?: Person;
  public children?: Array<Person> = [];
  public note?: string;
  public events?: Array<FamilyEvent>;
}
