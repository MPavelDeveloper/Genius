import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Family} from "../../../model/family";
import {Person} from "../../../model/person";
import {Observable} from "rxjs";
import {DataProvider} from "../data-provider";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {

  public persons: Array<Person>;

  constructor(private http: HttpClient) {
    super();
    this.getPersons().subscribe(res => this.persons = res,
      (err) => {
        if (err.error?.status >= 400) {
          console.error(new Error(`Error status: ${err.error?.status}\n Error message: ${err.error?.message}\n Error path: ${err.error?.path}\n`));
        }
      });
  }

  private mapPerson(obj: any): Person {
    let person = new Person();
    person.id = obj.id;
    person.firstName = (obj.name) ? obj.name.first : null;
    person.middleName = (obj.name) ? obj.name.middle : null;
    person.lastName = (obj.name) ? obj.name.last : null;
    person.sex = (obj.gender) ? obj.gender.toLowerCase() : null;
    person.familyId = obj.parentFamilyId;

    return person;
  }

  private mapFamily(obj: any): Family {
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

  public addNewFamily(family: Family): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let newFamily = {
      "events": [] as Array<number>,
      "children": [] as Array<number>,
      "husband": family.father.id,
      "wife": family.mother.id,
    };

    if (family.children && family.children.length > 0) {
      family.children.forEach(child => newFamily.children.push(child.id))
    }

    this.http.post(`${environment.url}/families`, newFamily, httpOptions)
      .subscribe(data => data,
        (err) => {
          if (err.error.status >= 400) {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          } else {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          }
        });
  }

  public addNewPerson(person: Person): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let newPerson = {
      "events": [] as Array<number>,
      "gender": (person.sex) ? person.sex.toUpperCase() : null,
      "name": {
        "first": (person.firstName) ? person.firstName : null,
        "last": (person.lastName) ? person.lastName : null,
        "maiden": "string",
        "middle": (person.middleName) ? person.middleName : null,
      },
    };

    this.http.post(`${environment.url}/persons`, newPerson, httpOptions)
      .subscribe(data => data,
        (err) => {
          if (err.error.status >= 400) {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          } else {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          }
        });
  }

  public changeFamily(family: Family): void {
    let changeFamily = {
      "children": [] as Array<number>,
      "husband": (family.father) ? family.father.id : null,
      "wife": (family.mother) ? family.mother.id : null,
    }
    if (family.children && family.children.length > 0) {
      family.children.forEach(child => changeFamily.children.push(child.id));
    }
    this.http.put(`${environment.url}/families/${family.id}`, changeFamily)
      .subscribe(data => data,
        (err) => {
          if (err.error.status >= 400) {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          } else {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          }
        });
  }

  public changePerson(person: Person): void {
    this.http.put(`${environment.url}/persons/${person.id}`, {
      "events": [] as Array<number>,
      "gender": person.sex.toUpperCase(),
      "name": {
        "first": person.firstName,
        "last": person.lastName,
        "middle": person.middleName
      },
    })
      .subscribe(data => data,
        (err) => {
          if (err.error.status >= 400) {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          } else {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          }
        });
  }

  public deleteFamily(familyId: number): void {
    this.http.delete(`${environment.url}/families/${familyId}`)
      .subscribe(data => console.log(data),
        (err) => {
          if (err.error.status >= 400) {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          } else {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          }
        });
  }

  public deletePerson(personId: number) {
    this.http.delete(`${environment.url}/persons/${personId}`)
      .subscribe(data => console.log(data),
        (err) => {
          if (err.error.status >= 400) {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          } else {
            console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
          }
        });
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



