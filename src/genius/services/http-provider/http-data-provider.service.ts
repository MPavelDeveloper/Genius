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
    const dto: FamilyDTO = this.mapFamilyToDto(family);
    return this.http.post(`${environment.url}/families`, dto, this.httpOptionsSend)
  }

  public addNewPerson(person: Person): Observable<Object> {
    const dto = this.mapPersonToDto(person);
    return this.http.post(`${environment.url}/persons`, dto, this.httpOptionsSend)
  }

  public changeFamily(family: Family): Observable<Object> {
    const dto = this.mapFamilyToDto(family);
    return this.http.put(`${environment.url}/families/${family.id}`, dto, this.httpOptionsSend)
  }

  public changePerson(person: Person): Observable<Object> {
    let dto = this.mapPersonToDto(person);
    return this.http.put(`${environment.url}/persons/${person.id}`, dto, this.httpOptionsSend)
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
    return {
      id: family.id,
      husband: family.father?.id,
      wife: family.mother?.id,
      children: family.children?.map(child => child.id),
      note: family.note
    };
  }

  private mapPersonToDto(person: Person): PersonDTO {
    return {
      id: person.id,
      name: {
        first: person.firstName,
        last: person.lastName,
        middle: person.middleName,
        maiden: person.maidenName
      },
      gender: person.sex.toUpperCase(),
      place: person.place,
      occupation: person.occupation,
      note: person.note,
      familyId: person.familyId
    };
  }

  private mapDtoToFamily(dto: FamilyDTO): Family {
    const family = new Family();
    family.id = dto.id;
    family.note = dto.note;

    if (dto.wife) {
      this.http.get<PersonDTO>(`${environment.url}/persons/${dto.wife}`, this.httpOptionsGet).subscribe(
        person => {
          family.mother = this.mapDtoToPerson(person);
        }
      );
    }
    if (dto.husband) {
      this.http.get<PersonDTO>(`${environment.url}/persons/${dto.husband}`, this.httpOptionsGet).subscribe(
        person => {
          family.father = this.mapDtoToPerson(person);
        }
      );
    }
    if (dto.children && dto.children.length > 0) {
      dto.children.forEach((childId: number) => {
        this.http.get<PersonDTO>(`${environment.url}/persons/${childId}`, this.httpOptionsGet).subscribe(
          person => {
            family.children.push(this.mapDtoToPerson(person));
          }
        );
      })
    }
    return family;
  }

  private mapDtoToPerson(dto: PersonDTO): Person {
    let person = new Person();
    person.id = dto.id;
    person.firstName = dto.name?.first;
    person.middleName = dto.name?.middle;
    person.lastName = dto.name?.last;
    // @ts-ignore
    person.sex = (dto.gender) ? Sex[dto.gender.toLowerCase()] : null;
    person.familyId = dto.familyId;
    person.note = dto.note;
    person.occupation = dto.occupation;
    person.place = dto.place;
    return person;
  }
}


