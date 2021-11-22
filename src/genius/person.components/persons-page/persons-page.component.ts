import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Person, Sex} from '../../../model/person';
import {DataProvider} from '../../services/data-provider';
import {PersonTemplateType} from '../person/person.component';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'persons-page',
  templateUrl: './persons-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit, OnDestroy {
  private dataLoadSubscription: Subscription;
  public person: Person;
  public persons: Array<Person>;
  public confirmDialogVisiable: boolean;
  public personTemplateType;
  public gender;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService) {
    this.loadPersons();
    this.personTemplateType = PersonTemplateType;
    this.gender = Sex;
  }

  ngOnInit() {
    this.dataLoadSubscription = this.dataLoad.persons$.subscribe(() => this.loadPersons());
  }

  ngOnDestroy() {
    this.dataLoadSubscription.unsubscribe();
  }

  public showConfirm(person: Person): void {
    this.person = person;
    this.confirmDialogVisiable = true;
  }

  public confirmActionHandler(confirmAction: ConfirmAction): void {
    if(confirmAction === ConfirmAction.OK) {
      this.dataProvider.deletePerson(this.person.id)
        .subscribe(() => {
          this.loadPersons();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    }
    this.confirmDialogVisiable = false;
  }

  public loadPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        this.persons = persons;
      },
      errorResponse => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }
}

