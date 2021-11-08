import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Person, Sex} from '../../../model/person';
import {DataProvider} from '../../services/data-provider';
import {PersonTemplateType} from '../person/person.component';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'persons-page',
  templateUrl: './persons-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./persons-page.component.scss']
})
export class PersonsPageComponent implements OnInit {
  public person: Person;
  public persons: Array<Person>;
  public showConfirmDialog: boolean;
  public personTemplateType;
  public gender;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService) {
    this.loadPersons();
    this.personTemplateType = PersonTemplateType;
    this.gender = Sex;
  }

  ngOnInit() {
    this.dataLoad.persons$.subscribe(() => this.loadPersons());
  }

  public showConfirm(person: Person): void {
    this.person = person;
    this.showConfirmDialog = true;
  }

  public confirmActionHandler(confirmAction: ConfirmAction): void {
    if(confirmAction === ConfirmAction.OK) {
      this.dataProvider.deletePerson(this.person.id)
        .subscribe(() => {
          this.loadPersons()
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    }
    this.showConfirmDialog = false;
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

