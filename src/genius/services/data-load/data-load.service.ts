import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoadService {

  public persons$ = new Subject<boolean>();
  public families$ = new Subject<boolean>();
  public personId$ = new Subject<number>();
  public familyId$ = new Subject<number>();

  constructor() {
  }

  public reloadPersons(changedPerson: boolean): void {
    this.persons$.next(changedPerson);
  }

  public reloadFamilies(changedFamilies: boolean): void {
    this.families$.next(changedFamilies);
  }

  public raloadPerson(personId: number): void {
    this.personId$.next(personId);
  }

  public reloadFamily(familyId: number): void {
    this.familyId$.next(familyId);
  }
}

