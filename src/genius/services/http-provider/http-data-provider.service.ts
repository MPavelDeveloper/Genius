import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Family} from '../../../model/family';
import {Person, Sex} from '../../../model/person';
import {Observable} from 'rxjs';
import {DataProvider} from '../data-provider';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {

  public persons: Array<Person>;

  constructor(private http: HttpClient) {
    super();
    this.getPersons().subscribe(httpResponseGetPersons => this.persons = httpResponseGetPersons,
      (errorHttpResponseGetPersons) => {
        console.error(`Error status: ${errorHttpResponseGetPersons.error?.status}\n Error message: ${errorHttpResponseGetPersons.error?.message}\n Error path: ${errorHttpResponseGetPersons.error?.path}\n`);
      });
  }

  protected mapPerson(obj: any): Person {
    let person = new Person();
    person.id = obj.id;
    person.firstName = (obj.name) ? obj.name.first : null;
    person.middleName = (obj.name) ? obj.name.middle : null;
    person.lastName = (obj.name) ? obj.name.last : null;
    person.sex = (obj.gender) ? obj.gender.toLowerCase() : null;
    person.familyId = obj.parentFamilyId;

    return person;
  }

  protected mapFamily(obj: any): Family {
    let family = new Family();
    family.children = [];
    family.id = obj.id;
    family.mother = this.persons.find(person => obj.wife === person.id)
    family.father = this.persons.find(person => obj.husband === person.id)
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((childId: number) => {
        let target = this.persons.find(person => person.id === childId)
        if (target) family.children.push(target)
      })
    }
    return family;
  }

  public addNewFamily(family: Family): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let newFamily: FamilyDTO = new FamilyDTO();
    if (family.father) {
      newFamily.husband = family.father.id
    }
    if (family.mother) {
      newFamily.wife = family.mother.id
    }
    if (family.children) {
      newFamily.children = family.children.map(child => child.id);
    }

    if (family.children && family.children.length > 0) {
      family.children.forEach(child => newFamily.children.push(child.id))
    }

    return this.http.post(`${environment.url}/families`, newFamily, httpOptions)
  }

  public addNewPerson(person: Person): Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let newPerson = new PersonDTO();
    newPerson.name = {};
    if (person.firstName) {
      newPerson.name.first = person.firstName;
    }
    if (person.lastName) {
      newPerson.name.last = person.lastName;
    }
    if (person.middleName) {
      newPerson.name.middle = person.middleName;
    }
    if (person.sex) {
      newPerson.gender = person.sex.toUpperCase();
    }

    return this.http.post(`${environment.url}/persons`, newPerson, httpOptions)
  }

  public changeFamily(family: Family): Observable<Object> {
    let changeFamily = new FamilyDTO()
    if (family.father) {
      changeFamily.husband = family.father.id;
    }
    if (family.mother) {
      changeFamily.wife = family.mother.id;
    }
    if (family.children && family.children.length > 0) {
      changeFamily.children = family.children.map(child => child.id)
    } else {
      changeFamily.children = [];
    }

     return this.http.put(`${environment.url}/families/${family.id}`, changeFamily)
  }

  public changePerson(person: Person): Observable<Object>{
    let changePerson = new PersonDTO();
    changePerson.name = {first: null,}
    if (person.firstName) {
      changePerson.name.first = person.firstName;
    }
    if (person.lastName) {
      changePerson.name.last = person.lastName;
    }
    if (person.middleName) {
      changePerson.name.middle = person.middleName;
    }
    if (person.sex) {
      changePerson.gender = person.sex.toUpperCase();
    }

     return this.http.put(`${environment.url}/persons/${person.id}`, changePerson)
  }

  public deleteFamily(familyId: number): Observable<Object> {
    return this.http.delete(`${environment.url}/families/${familyId}`)
  }

  public deletePerson(personId: number): Observable<Object> {
    return this.http.delete(`${environment.url}/persons/${personId}`)
  }

  public findFamily(familyId: number): Observable<Family> {
    return this.http.get<Object>(`${environment.url}/persons/${familyId}`)
      .pipe(
        map(httpResponse => this.mapFamily(httpResponse))
      )
  }

  public findPerson(personId: number): Observable<Person> {
    return this.http.get<Object>(`${environment.url}/persons/${personId}`)
      .pipe(
        map(httpResponse => this.mapPerson(httpResponse))
      )
  }

  public getFamilies(): Observable<Array<Family>> {
    return this.http.get<Array<Object>>(`${environment.url}/families`)
      .pipe(
        map(httpResponse => httpResponse.map(obj => this.mapFamily(obj)))
      );
  }

  public getPersons(): Observable<Array<Person>> {
    return this.http.get<Array<Object>>(`${environment.url}/persons`)
      .pipe(
        map(httpResponse => httpResponse.map(obj => this.mapPerson(obj)))
      );
  }

}

class FamilyDTO {
  husband: number;
  wife: number;
  children: Array<number>;
}

class PersonDTO {
  name: {
    first?: string,
    middle?: string,
    last?: string,
  };
  gender: string;
}
