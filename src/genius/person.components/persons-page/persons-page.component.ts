import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
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
  styleUrls: ['./persons-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonsPageComponent implements OnInit, OnDestroy {
  private dataLoadSubscription: Subscription;
  public person: Person;
  public persons: Array<Person>;
  public confirmDialogVisible: boolean;
  public personTemplateType;
  public gender;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService, private changeDetection: ChangeDetectorRef) {
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
    this.confirmDialogVisible = true;
    this.changeDetection.detectChanges();
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
    this.confirmDialogVisible = false;
  }

  public loadPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        this.persons = persons;
        this.changeDetection.detectChanges();
      },
      errorResponse => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }
}

