import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Family } from '../../../model/family';
import { Person, Sex } from '../../../model/person';
import { DataProvider } from '../data-provider';
import { FamilyDTO, PersonDTO } from "../dto/dtOs";

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {

  private readonly httpOptionsSend = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private readonly httpOptionsGet = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    super();
  }

  public addNewFamily(family: Family): Observable<Object> {
    const newFamily: FamilyDTO = this.mapFamilyToDto(family);
    return this.http.post(`${environment.url}/families`, newFamily, this.httpOptionsSend)
  }

  public addNewPerson(person: Person): Observable<Object> {
    const dto = this.mapPersonToDto(person);
    return this.http.post(`${environment.url}/persons`, dto, this.httpOptionsSend)
  }

  public changeFamily(family: Family): Observable<Object> {
    const changeFamily = this.mapFamilyToDto(family);
    return this.http.put(`${environment.url}/families/${family.id}`, changeFamily, this.httpOptionsSend)
  }

  public changePerson(person: Person): Observable<Object> {
    let changePerson = this.mapPersonToDto(person);
    return this.http.put(`${environment.url}/persons/${person.id}`, changePerson, this.httpOptionsSend)
  }

  public deleteFamily(familyId: number): Observable<Object> {
    return this.http.delete(`${environment.url}/families/${familyId}`)
  }

  public deletePerson(personId: number): Observable<Object> {
    return this.http.delete(`${environment.url}/persons/${personId}`)
  }

  public findFamily(familyId: number): Observable<Family> {
    return this.http.get<FamilyDTO>(`${environment.url}/persons/${familyId}`, this.httpOptionsGet)
    .pipe(
      map(httpResponse => this.mapDtoToFamily(httpResponse))
    )
  }

  public findPerson(personId: number): Observable<Person> {
    return this.http.get<PersonDTO>(`${environment.url}/persons/${personId}`, this.httpOptionsGet)
    .pipe(
      map(httpResponse => this.mapDtoToPerson(httpResponse))
    )
  }

  public getFamilies(): Observable<Array<Family>> {
    return this.http.get<Array<FamilyDTO>>(`${environment.url}/families`, this.httpOptionsGet)
    .pipe(
      map(httpResponse => httpResponse.map(obj => this.mapDtoToFamily(obj)))
    );
  }

  public getPersons(): Observable<Array<Person>> {
    return this.http.get<Array<PersonDTO>>(`${environment.url}/persons`, this.httpOptionsGet)
    .pipe(
      map(httpResponse => httpResponse.map(obj => this.mapDtoToPerson(obj)))
    );
  }

  private mapFamilyToDto(family: Family): FamilyDTO {
    let changeFamily = new FamilyDTO()
    if (family.father) {
      changeFamily.husband = family.father.id;
    }
    if (family.mother) {
      changeFamily.wife = family.mother.id;
    }
    if (family.children && family.children.length > 0) {
      changeFamily.children = family.children.map(child => child.id)
    }
    return changeFamily;
  }

  private mapPersonToDto(person: Person): PersonDTO {
    const dto = new PersonDTO();
    if (person.firstName) {
      dto.name.first = person.firstName;
    }
    if (person.lastName) {
      dto.name.last = person.lastName;
    }
    if (person.middleName) {
      dto.name.middle = person.middleName;
    }
    if (person.sex) {
      dto.gender = person.sex.toUpperCase();
    }
    return dto;
  }

  private mapDtoToFamily(obj: FamilyDTO): Family {
    const family = new Family();
    family.id = obj.id;
    if (obj.wife) {
      this.http.get<PersonDTO>(`${environment.url}/persons/${obj.wife}`, this.httpOptionsGet).subscribe(
        person => {
          family.mother = this.mapDtoToPerson(person);
        }
      );
    }
    if (obj.husband) {
      this.http.get<PersonDTO>(`${environment.url}/persons/${obj.husband}`, this.httpOptionsGet).subscribe(
        person => {
          family.father = this.mapDtoToPerson(person);
        }
      );
    }
    if (obj.children && obj.children.length > 0) {
      obj.children.forEach((childId: number) => {
        this.http.get<PersonDTO>(`${environment.url}/persons/${childId}`, this.httpOptionsGet).subscribe(
          person => {
            family.children.push(this.mapDtoToPerson(person));
          }
        );
      })
    }
    return family;
  }

  private mapDtoToPerson(obj: PersonDTO): Person {
    let person = new Person();
    person.id = obj.id;
    person.firstName = obj.name?.first;
    person.middleName = obj.name?.middle;
    person.lastName = obj.name?.last;
    // @ts-ignore
    person.sex = (obj.gender) ? Sex[obj.gender.toLowerCase()] : null;
    person.familyId = obj.parentFamilyId;
    return person;
  }
}


