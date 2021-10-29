import {Observable} from 'rxjs';
import {Person} from '../../model/person';
import {Family} from '../../model/family';
import {LifeEvent} from '../../model/life-event';

export abstract class DataProvider {
  abstract getPersons(): Observable<Array<Person>>;

  abstract getFamilies(): Observable<Array<Family>>;

  abstract findPerson(personId: number): Observable<Person>;

  abstract findFamily(familyId: number): Observable<Family>;

  abstract addNewPerson(person: Person): Observable<Object>;

  abstract addNewFamily(family: Family): Observable<Object>;

  abstract deletePerson(personId: number): Observable<Object>;

  abstract deleteFamily(familyId: number): Observable<Object>;

  abstract changeFamily(family: Family): Observable<Object>;

  abstract changePerson(person: Person): Observable<Object>;

  abstract addNewPersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object>;

  abstract deletePersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object>;

  abstract changePersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object>;

}
