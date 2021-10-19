import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GENEALOGY_STORAGE_KEY } from '../../../json';
import { Family } from '../../../model/family';
import { LineAge } from '../../../model/line-age';
import { Person } from '../../../model/person';
import { DataProvider } from '../data-provider';


@Injectable({
  providedIn: 'root',
})
export class LocalStorageDataProvider extends DataProvider {
  public persons: Array<Person>;
  public families: Array<Family>;

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
    person.lifeEvent = obj.lifeEvent;
    person.familyId = obj.familyId;
    return person;
  }

  protected mapFamily(obj: any): Family {
    let family = new Family();
    family.id = obj.id;
    family.father = obj.father;
    family.mother = obj.mother;
    family.children = obj.children;
    return family;
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
    if (this.checkFamilyPerson(family)) {
      this.setPersonsId(family);
      this.putData();
    } else {
      this.deleteFamily(family.id);
    }
    return observableChangeFamily;
  }

  public changePerson(person: Person): Observable<Object> {
    let observableChangePerson: Observable<Object> = new Observable(subscriber => {
      subscriber.next('an existing person was modified in local storage');
    });
    this.getPersons()
      .subscribe(() => {
        if (person.familyId) {
          this.findFamily(person.familyId)
            .subscribe(family => {
              if (family.father.id === person.id) {
                family.father = person;
              } else if (family.mother.id === person.id) {
                family.mother = person;
              } else {
                family.children.forEach((child: Person, index: number) => {
                  if (child.id === person.id) {
                    family.children[index] = person;
                  }
                })
              }

            })
        }
      })
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
        subscriber.next(this.families.find((family: Family) => family.id === familyId));
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
    const currentId = this.persons.reduce((previusId: number, item: Person) => {
      if (previusId < item.id) return item.id;
      return previusId;
    }, 0);

    return currentId + 1;
  }

  private getNewFamilyID(): number {
    const currentId = this.families.reduce((previusId: number, item: Family) => {
      if (previusId < item.id) return item.id;
      return previusId;
    }, 0);

    return currentId + 1;
  }

  private setPersonsId(family: Family): void {
    if (family.father && !family.father.id) {
      this.addNewPerson(family.father);
    }
    // add in target family as child
    // if (family.father && family.father.familyId) {
    //   this.changeExistFamilyChildren(family.father)
    // }
    if (family.mother && !family.mother.id) {
      this.addNewPerson(family.mother);
    }
    // add in target family as child
    // if (family.mother && family.mother.familyId) {
    //   this.changeExistFamilyChildren(family.mother)
    // }
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
    return (family.father) ? true :
      (family.mother) ? true :
        (family.children && family.children.length > 0) ? true : false;
  }

  private putData(): void {
    let data: LineAge = new LineAge(this.families, this.persons);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(data));
  }

  public reloadData() {
    const data = JSON.parse(localStorage.getItem(GENEALOGY_STORAGE_KEY));
    if (data) {
      this.persons = data.personList.map((obj: any) => this.mapPerson(obj));
      this.families = data.familyList.map((obj: any) => this.mapFamily(obj));
    }
  }


}
