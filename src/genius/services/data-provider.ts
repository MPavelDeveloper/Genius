import {Observable} from 'rxjs';
import {Person} from '../../model/person';
import {Family} from '../../model/family';
import {LifeEvent} from '../../model/life-event';
import {HttpResponse} from '@angular/common/http';
import {UserLoginData, UserRegistryData} from '../user-login/user-login.component';

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

  abstract addNewFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object>;

  abstract deleteFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object>;

  abstract changeFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object>;

  abstract getToken(): string;

  abstract setToken(value: string): void;

  abstract registerUser(data: UserRegistryData): Observable<HttpResponse<object>>;

  abstract loginUser(data: UserLoginData): Observable<HttpResponse<object>>;
}
