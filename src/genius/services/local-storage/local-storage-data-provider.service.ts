import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GENEALOGY_STORAGE_KEY} from '../../../json';
import {Family} from '../../../model/family';
import {LineAge} from '../../../model/line-age';
import {Person} from '../../../model/person';
import {DataProvider} from '../data-provider';
import * as moment from 'moment'
import {LifeEvent, LifeEventPrefix, LifeEventType} from '../../../model/life-event';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageDataProvider extends DataProvider {
  public persons: Array<Person>;
  public families: Array<Family>;
  public lifeEvents: Array<LifeEvent>;

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
    return family;
  }

  protected mapPersonEvents(obj: any): Array<LifeEvent> {
    return obj.lifeEvents.map((lifeEvent: any) => {
      if (!lifeEvent.type) lifeEvent.type = LifeEventType.DEFAULT;
      if (!lifeEvent.prefix) lifeEvent.prefix = LifeEventPrefix.NONE;
      lifeEvent.date = moment(lifeEvent.date).format('YYYY-MM-DD');
      return lifeEvent;
    })
  }

  public addNewFamily(family: Family): Observable<Object> {
    let observableAddNewFamily: Observable<Object> = new Observable(subscriber => {
      subscriber.next('new family added to Local Storage')
    });
    family.id = this.getNewFamilyID();
    this.setPersonsId(family);
    this.families.push(family);
    this.putData();

    return observableAddNewFamily;
  }

  public addNewPerson(person: Person): Observable<Object> {
    let observableAddNewPerson: Observable<Object> = new Observable(subscriber => {
      subscriber.next('new person added to Local Storage')
    });
    person.id = this.getNewPersonID();
    this.persons.push(person);
    this.putData();
    return observableAddNewPerson;
  }

  public changeFamily(family: Family): Observable<Object> {
    let observableChangeFamily: Observable<Object> = new Observable(subscriber => {
      subscriber.next('an existing family was modified in local storage')
    });
    this.setPersonsId(family);
    let familyIndex = this.families.findIndex(currentFamily => currentFamily.id === family.id);
    console.log(101010)
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
    const delIndex = this.families.findIndex(family => family.id === familyId)
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

  private changeExistFamilyChildren(person: Person): void {
    const targetFamily = this.findFamily(person.familyId);
    targetFamily.subscribe((family: Family) => {
      if (family) {
        if (family.children === null) {
          family.children = [person];
        } else {
          family.children.push(person);
        }
      }
    })
    // if (targetFamily) {
    //   (targetFamily.children === null) ? targetFamily.children = [person] :
    //     targetFamily.children.push(person);
    // }
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
    }
  }

  private getLifeEvents() {
    const lifeEvents: Array<LifeEvent> = [];
    this.persons.forEach(person => {
      if (person.lifeEvents.length > 0) {
        lifeEvents.push(...person.lifeEvents);
      }
    })
    this.lifeEvents = lifeEvents;
  }

  public addNewPersonEvent(personId: number, lifeEvent: LifeEvent): Observable<Object> {
    this.findPerson(personId).subscribe(person => {
      lifeEvent.id = this.getNewLifeEventID();
      person.lifeEvents.push(lifeEvent)
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
        this.replacePersonInFamily(person)
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



  addNewFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    return undefined;
  }

  changeFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {
    return undefined;
  }

  deleteFamilyEvent(familyId: number, lifeEvent: LifeEvent): Observable<Object> {

    return undefined
  }
}
