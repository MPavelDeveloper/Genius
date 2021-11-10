import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Family} from '../../../model/family';
import {Person} from '../../../model/person';
import {DataProvider} from '../data-provider';
import {EventDTO, FamilyDTO, PersonDTO} from '../dto/dtOs';
import {LifeEvent} from '../../../model/life-event';
import {UserLoginData, UserRegistryData} from '../../user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class HttpDataProvider extends DataProvider {

  private readonly httpOptionsSend = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': ' */*',
    }),
  };

  private readonly httpOptionsGet = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  };

  private token: string;

  constructor(private http: HttpClient) {
    super();
  }

  public getFamilies(): Observable<Array<Family>> {
    return new Observable<Array<Family>>(subscriber => {

      this.getPersons().subscribe(persons => {
        this.http.get<Array<FamilyDTO>>(`${environment.url}/families`, this.httpOptionsGet)
          .subscribe(families => {
            let lifeEventCalls = families.map(family => this.getFamilyEvents(family.id))
            zip(...lifeEventCalls).subscribe((res: any) => {
              let events = res.flat();
              const result: Array<Family> = families.map(family => this.mapDtoToFamily(family, persons, events));
              subscriber.next(result);
            })
          });
      });
    });
  }

  public addNewFamily(family: Family): Observable<Object> {
    const dto: FamilyDTO = this.mapFamilyToDto(family);
    return this.http.post(`${environment.url}/families`, dto, this.httpOptionsSend)
  }

  public changeFamily(family: Family): Observable<Object> {
    const dto = this.mapFamilyToDto(family);
    return this.http.put(`${environment.url}/families/${family.id}`, dto, this.httpOptionsSend)
  }

  public deleteFamily(familyId: number): Observable<Object> {
    return this.http.delete(`${environment.url}/families/${familyId}`)
  }

  public findFamily(familyId: number): Observable<Family> {
    return new Observable<Family>(subscriber => {

      this.http.get<FamilyDTO>(`${environment.url}/families/${familyId}`, this.httpOptionsGet)
        .subscribe(dto => {
          const personCalls = this.getFamilyPersonIds(dto).map(personId => this.findPerson(personId));
          zip(...personCalls).subscribe(persons => {
            this.getFamilyEvents(familyId).subscribe(events => {
              const family = new Family();
              family.id = dto.id;
              family.note = dto.note;

              if (dto.husband) {
                family.husband = persons.find(person => person.id === dto.husband);
                this.removeItem(persons, family.husband);
              }
              if (dto.wife) {
                family.wife = persons.find(person => person.id === dto.wife);
                this.removeItem(persons, family.wife);
              }
              if (persons.length > 0) {
                family.children.push(...persons);
              }

              (events && events.length > 0) ? family.events = events : family.events = [];
              subscriber.next(family);
            })
          });
        });
    });
  }

  public getPersons(): Observable<Array<Person>> {
    return this.http.get<Array<PersonDTO>>(`${environment.url}/persons`, this.httpOptionsGet)
      .pipe(
        map(httpResponse => httpResponse.map(obj => this.mapDtoToPerson(obj)))
      );
  }

  public addNewPerson(person: Person): Observable<Object> {
    const dto = this.mapPersonToDto(person);
    return this.http.post(`${environment.url}/persons`, dto, this.httpOptionsSend)
  }

  public changePerson(person: Person): Observable<Object> {
    let dto = this.mapPersonToDto(person);
    return this.http.put(`${environment.url}/persons/${person.id}`, dto, this.httpOptionsSend)
  }

  public deletePerson(personId: number): Observable<Object> {
    return this.http.delete(`${environment.url}/persons/${personId}`)
  }

  public findPerson(personId: number): Observable<Person> {
    return this.http.get<PersonDTO>(`${environment.url}/persons/${personId}`, this.httpOptionsGet)
      .pipe(
        map((httpResponse) => {
          return this.mapDtoToPerson(httpResponse);
        }));
  }

  public addNewPersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    return this.http.post(`${environment.url}/persons/${personId}/events`, lifeEvent, this.httpOptionsSend);
  }

  public deletePersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    return this.http.delete(`${environment.url}/persons/${personId}/events/${lifeEvent.id}`)
  }

  public changePersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    return new Observable(subscriber => {
      this.deletePersonEvent(personId, lifeEvent)
        .subscribe(() => {
          subscriber.next(this.addNewPersonEvent(personId, lifeEvent));
        })
    })
  }

  private getFamilyEvents(familyId: number): Observable<Array<LifeEvent>> {
    return this.http.get<Array<EventDTO>>(`${environment.url}/families/${familyId}/events`, this.httpOptionsGet)
      .pipe(
        map(httpResponse => httpResponse.map(obj => this.mapDtoToEvent(obj)))
      );
  }

  public addNewFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    return this.http.post(`${environment.url}/families/${familyId}/events`, lifeEvent, this.httpOptionsSend);
  }

  public changeFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    return undefined;
  }

  public deleteFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    return this.http.delete(`${environment.url}/families/${familyId}/events/${lifeEvent.id}`);
  }

  private mapFamilyToDto(family: Family): FamilyDTO {
    return {
      id: family.id,
      husband: family.husband?.id,
      wife: family.wife?.id,
      children: family.children?.map(child => child.id),
      note: family.note,
      events: family.events?.map(events => events.id)
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
      events: person.lifeEvents,
      familyId: person.familyId
    };
  }

  private mapDtoToFamily(dto: FamilyDTO, persons: Array<Person>, events: Array<LifeEvent>): Family {
    let family = new Family();
    family.events = [];
    family.id = dto.id;
    family.note = dto.note;

    family.wife = persons.find(person => dto.wife === person.id)
    family.husband = persons.find(person => dto.husband === person.id)

    if (dto.children && dto.children.length > 0) {
      dto.children
        .map((childId: number) => persons.find(person => person.id === childId))
        .filter(person => !!person)
        .forEach(child => family.children.push(child));
    }

    if (dto.events && dto.events.length > 0) {
      dto.events.forEach((eventId: number) => {
        let targetEvent = events.find(event => event.id === eventId);
        family.events.push(targetEvent);
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
    person.sex = (dto.gender) ? dto.gender.toLowerCase() : null;
    person.familyId = dto?.parentFamilyId;
    person.lifeEvents = dto.events;
    return person;
  }

  private mapDtoToEvent(dto: EventDTO): LifeEvent {
    let lifeEvent = new LifeEvent()
    lifeEvent.id = dto.id;
    lifeEvent.type = dto.type;
    lifeEvent.prefix = dto.prefix;
    lifeEvent.date = dto.date;
    lifeEvent.place = dto.place;
    lifeEvent.note = dto.note;
    return lifeEvent;
  }

  private getFamilyPersonIds(family: FamilyDTO): Array<number> {
    const ids: Array<number> = [];
    if (family.wife) {
      ids.push(family.wife);
    }
    if (family.husband) {
      ids.push(family.husband);
    }
    if (family.children) {
      ids.push(...family.children);
    }
    return ids;
  }

  private removeItem(items: Array<any>, item: any) {
    let index = items.indexOf(item);
    if (index > -1) {
      items.splice(index, 1);
    }
  }

  public loginUser(data: UserLoginData): Observable<HttpResponse<object>> {
    return this.http.post(`${environment.login}/user/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
    });
  }

  public registerUser(data: UserRegistryData): Observable<HttpResponse<object>> {
    return this.http.post(`${environment.registry}/user/registration`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
    });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken(): string {
    return this.token
  }

}
