import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GENEALOGY_STORAGE_KEY, GENEALOGY_USER_REGISTRY_KEY, UserDataLocalStorage} from '../../../json';
import {Family} from '../../../model/family';
import {LineAge} from '../../../model/line-age';
import {Person} from '../../../model/person';
import {DataProvider} from '../data-provider';
import * as moment from 'moment'
import {FamilyEventType, LifeEvent, EventPrefix, LifeEventType} from '../../../model/life-event';
import {UserLoginData, UserRegistryData} from '../../user-login/user-login.component';
import {generateTokenForLocalStorage} from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageDataProvider extends DataProvider {
  private token: string;
  public persons: Array<Person>;
  public families: Array<Family>;
  public lifeEvents: Array<LifeEvent>;
  public events: Array<LifeEvent>;

  constructor() {
    super();
    this.reloadData();
  }

  protected mapPerson(obj: any): Person {
    let person = new Person();
    person.id = obj.id;
    person.firstName = obj.firstName;
    person.lastName = obj.lastName;
    person.middleName = obj.middleName;
    person.age = obj.age;
    person.sex = obj.sex;
    if (obj.lifeEvents && obj.lifeEvents.length > 0) {
      person.lifeEvents = this.mapPersonEvents(obj)
    } else {
      person.lifeEvents = [];
    }
    person.familyId = obj.familyId;
    return person;
  }

  protected mapFamily(obj: any): Family {
    let family = new Family();
    family.id = obj.id;
    family.husband = obj.husband;
    family.wife = obj.wife;
    family.children = obj.children;
    if (obj.events && obj.events.length > 0) {
      family.events = this.mapFamilyEvents(obj)
    } else {
      family.events = [];
    }
    return family;
  }

  protected mapPersonEvents(obj: any): Array<LifeEvent> {
    return obj.lifeEvents.map((lifeEvent: any) => {
      if (!lifeEvent.type) lifeEvent.type = LifeEventType.DEFAULT;
      if (!lifeEvent.prefix) lifeEvent.prefix = EventPrefix.NONE;
      lifeEvent.date = moment(lifeEvent.date).format('YYYY-MM-DD');
      return lifeEvent;
    })
  }

  protected mapFamilyEvents(obj: any): Array<LifeEvent> {
    return obj.events.map((lifeEvent: any) => {
      if (!lifeEvent.type) lifeEvent.type = FamilyEventType.DEFAULT;
      if (!lifeEvent.prefix) lifeEvent.prefix = EventPrefix.NONE;
      lifeEvent.date = moment(lifeEvent.date).format('YYYY-MM-DD');
      return lifeEvent;
    })
  }

  public addNewFamily(family: Family): Observable<Object> {
    let observableAddNewFamily: Observable<Object> = new Observable(subscriber => {
      subscriber.next('new family added to Local Storage');
    });
    family.id = this.getNewFamilyID();

    this.setPersonsId(family);
    this.families.push(family);
    this.putData();

    return observableAddNewFamily;
  }

  public addNewPerson(person: Person): Observable<Object> {
    let observableAddNewPerson: Observable<Object> = new Observable(subscriber => {
      subscriber.next('new person added to Local Storage');
    });
    person.id = this.getNewPersonID();
    this.persons.push(person);
    this.putData();
    return observableAddNewPerson;
  }

  public changeFamily(family: Family): Observable<Object> {
    let observableChangeFamily: Observable<Object> = new Observable(subscriber => {
      subscriber.next('an existing family was modified in local storage');
    });
    this.setPersonsId(family);
    let familyIndex = this.families.findIndex(currentFamily => currentFamily.id === family.id);
    if (familyIndex > -1) {
      this.families[familyIndex] = family;
    }
    this.putData();
    this.reloadData();
    return observableChangeFamily;
  }

  public changePerson(person: Person): Observable<Object> {
    let observableChangePerson: Observable<Object> = new Observable(subscriber => {
      subscriber.next('an existing person was modified in local storage');
      subscriber.complete();
    });

    if (person.familyId) {
      this.findFamily(person.familyId).subscribe(family => {
        if (family.husband.id === person.id) {
          family.husband = person;
        } else if (family.wife.id === person.id) {
          family.wife = person;
        } else {
          family.children.forEach((child: Person, index: number) => {
            if (child.id === person.id) {
              family.children[index] = person;
            }
          })
        }

      })
    }
    let personIndex = this.persons.findIndex(currentPerson => currentPerson.id === person.id)
    if (personIndex > -1) {
      this.persons[personIndex] = person
    }

    this.putData();
    return observableChangePerson;
  }

  public deleteFamily(familyId: number): Observable<Object> {
    let observableDeleteFamily: Observable<Object> = new Observable(subscriber => {
      subscriber.next('an existing family has been removed from local storage');
    })
    const delIndex = this.families.findIndex(family => family.id === familyId);
    if (delIndex != -1) {
      this.families.splice(delIndex, 1);
    }
    this.putData();
    return observableDeleteFamily;
  }

  public deletePerson(personId: number): Observable<Object> {
    let observableDeletePerson: Observable<Object> = new Observable(subscriber => {
      subscriber.next('an existing person has been removed from local storage');
    })
    const delIndex = this.persons.findIndex(person => person.id === personId);
    if (delIndex != -1) {
      this.persons.splice(delIndex, 1);
    }
    this.putData();
    return observableDeletePerson;
  }

  public findPerson(personId: number): Observable<Person> {
    if (personId) {
      return new Observable(subscriber => {
        subscriber.next(this.persons.find((p: Person) => p.id === personId));
      });
    }
    return undefined;
  }

  public findFamily(familyId: number): Observable<Family> {
    if (familyId) {
      return new Observable<Family>(subscriber => {
        subscriber.next(this.families.find((family: Family) => family.id === familyId))
      });
    }
    return undefined;
  }

  public getFamilies(): Observable<Array<Family>> {
    return new Observable(subscriber => {
      subscriber.next(this.families);
    });
  }

  public getPersons(): Observable<Array<Person>> {
    return new Observable(subscriber => {
      subscriber.next(this.persons);
    });
  }

  private getNewPersonID(): number {
    const currentId = this.persons.reduce((previousId: number, item: Person) => {
      if (previousId < item.id) return item.id;
      return previousId;
    }, 0);

    return currentId + 1;
  }

  private getNewFamilyID(): number {
    const currentId = this.families.reduce((previousId: number, item: Family) => {
      if (previousId < item.id) return item.id;
      return previousId;
    }, 0);

    return currentId + 1;
  }

  private getNewLifeEventID(): number {
    const currentId = this.lifeEvents.reduce((previousId: number, item: LifeEvent) => {
      if (previousId < item.id) return item.id;
      return previousId;
    }, 0)

    return currentId + 1;
  }

  private getNewEventID(): number {
    const currentId = this.events.reduce((previousId: number, item: LifeEvent) => {
      if (previousId < item.id) return item.id;
      return previousId;
    }, 0)

    return currentId + 1;
  }

  private setPersonsId(family: Family): void {
    if (family.husband && !family.husband.id) {
      this.addNewPerson(family.husband);
    }
    if (family.wife && !family.wife.id) {
      this.addNewPerson(family.wife);
    }
    if (family.children) {
      family.children.forEach(child => {
        child.familyId = family.id;
        if (!child.id) {
          this.addNewPerson(child);
        }
      });
    }
  }

  private checkFamilyPerson(family: Family): Boolean {
    return (family.husband) ? true :
      (family.wife) ? true :
        (family.children && family.children.length > 0) ? true : false;
  }

  public putData(): void {
    let data: LineAge = new LineAge(this.families, this.persons);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(data));
  }

  public reloadData(): void {
    const data = JSON.parse(localStorage.getItem(GENEALOGY_STORAGE_KEY));
    if (data) {
      this.persons = data.personList.map((obj: any) => this.mapPerson(obj));
      this.families = data.familyList.map((obj: any) => this.mapFamily(obj));
      this.getLifeEvents();
      this.getEvents();
    }
  }

  private getLifeEvents() {
    const lifeEvents: Array<LifeEvent> = [];
    this.persons.forEach(person => {
      if (person.lifeEvents.length > 0) {
        lifeEvents.push(...person.lifeEvents);
      }
    });
    this.lifeEvents = lifeEvents;
  }

  private getEvents() {
    const events: Array<LifeEvent> = [];
    this.families.forEach(family => {
      if (family.events.length > 0) {
        events.push(...family.events);
      }
    });
    this.events = events;
  }

  public addNewPersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    this.findPerson(personId).subscribe(person => {
      lifeEvent.id = this.getNewLifeEventID();
      person.lifeEvents.push(lifeEvent);
      if (person.familyId) {
        this.replacePersonInFamily(person);
      }
      this.putData();
      this.reloadData();
    })
    return new Observable(subscriber => {
      subscriber.next('person event saved');
    })
  }

  public deletePersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    this.findPerson(personId).subscribe(person => {
      let deleteLifeEventIndex = person.lifeEvents.findIndex(currentLifeEvent => currentLifeEvent.id === lifeEvent.id);
      person.lifeEvents.splice(deleteLifeEventIndex, 1);
      if (person.familyId) {
        this.replacePersonInFamily(person);
      }
      this.putData();
    });
    return new Observable(subscriber => {
      subscriber.next('person event deleted');
    })
  }

  public changePersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    this.findPerson(personId).subscribe(person => {
      if (person.familyId) {
        this.replacePersonInFamily(person);
      }
      this.putData();
    })
    return new Observable<Object>(subscriber => {
      subscriber.next('person event changed');
    })
  }

  private replacePersonInFamily(person: Person): void {
    this.findFamily(person.familyId).subscribe(targetFamily => {
      if (targetFamily.husband && targetFamily.husband.id === person.id) {
        targetFamily.husband = person;
      }
      if (targetFamily.wife && targetFamily.wife.id === person.id) {
        targetFamily.wife = person;
      }
      if (targetFamily.children) {
        targetFamily.children.forEach((child, index) => {
          if (child.id === person.id)
            targetFamily.children[index] = person;
        })
      }
    });
  }

  public addNewFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    let family = this.families.find(family => family.id === familyId);
    lifeEvent.id = this.getNewEventID();
    if (family.events) {
      family.events.push(lifeEvent);
    } else {
      family.events = [lifeEvent];
    }
    this.putData();
    this.reloadData();

    return new Observable(subscriber => {
      subscriber.next('family event changed');
    })
  }

  public changeFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    let family = this.families.find(family => family.id === familyId);
    let eventIndex = family.events.findIndex(event => event.id === lifeEvent.id);
    family.events[eventIndex] = lifeEvent;
    this.putData();
    this.reloadData();

    return new Observable(subscriber => {
      subscriber.next('family event changed');
    });
  }

  public deleteFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    let family = this.families.find(family => family.id === familyId);
    let eventIndex = family.events.findIndex(event => event.id === lifeEvent.id);
    family.events.splice(eventIndex, 1);
    this.putData();
    this.reloadData();

    return new Observable(subscriber => {
      subscriber.next('family event deleted');
    })
  }

  public setToken(value: string): void {
    this.token = value;
  }

  public getToken(): string {
    return this.token;
  }

  public loginUser(data: UserLoginData): Observable<string> {
    return new Observable<string>( subscriber => {
      let userRegistry = this.getUserRegistry();
      console.log(userRegistry)
      let targetUser = userRegistry.find( (user: UserDataLocalStorage) => {
        if(user.login === data.username && user.password === user.password) {
            return true;
          }
        return false;
      })

      if(targetUser) {
        subscriber.next(targetUser.token);
      } else {
        subscriber.next('');
      }
    });
  }

  public registerUser(data: UserRegistryData): Observable<string> {
    let userData: UserDataLocalStorage = {
      login: data.email,
      password: data.password,
      token: generateTokenForLocalStorage(),
    };
    this.addUserInUserRegistry(userData);

    return new Observable<string>( subscriber => {
      subscriber.next('')
    });
  }

  private getUserRegistry() {
    return JSON.parse(localStorage.getItem(GENEALOGY_USER_REGISTRY_KEY))
  }

  private addUserInUserRegistry(user: UserDataLocalStorage) {
    let userRegistry = this.getUserRegistry();
    userRegistry.push(user);
    localStorage.setItem(GENEALOGY_USER_REGISTRY_KEY, JSON.stringify(userRegistry));
  }
}
