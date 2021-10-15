import {Observable} from "rxjs";
import {Person} from "../../model/person";
import {Family} from "../../model/family";

export abstract class DataProvider {
  abstract getPersons(): Observable<Array<Person>>;

  abstract getFamilies(): Observable<Array<Family>>;

  abstract findPerson(personId: number): Observable<Person>;

  abstract findFamily(familyId: number): Observable<Family>;

  abstract addNewPerson(person: Person): void;

  abstract addNewFamily(family: Family): void;

  abstract deletePerson(personId: number): void;

  abstract deleteFamily(familyId: number): void;

  abstract changeFamily(family: Family): void;

  abstract changePerson(person: Person): void;


}
