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

  public reloadPersons(changedPersons: boolean): void {
    this.persons$.next(changedPersons);
  }

  public reloadFamilies(changedFamilies: boolean): void {
    this.families$.next(changedFamilies);
  }
}

