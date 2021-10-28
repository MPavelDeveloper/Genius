import {Component, ViewChild} from '@angular/core';
import {PersonFormTemplateVersion} from '../person-form/person-form.component';
import {Person} from '../../model/person';
import {DataProvider} from '../services/data-provider';
import {PersonListComponent, PersonsListTemplateType} from '../person-list/person-list.component';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent {
  @ViewChild(PersonListComponent, {static: false})
  private personListComponent: PersonListComponent;
  public currentPerson: Person;
  public personDialogVisible: Boolean;
  public personComponentTemplate;
  public personListComponentTemplate;
  public createNewPerson: Boolean;

  constructor(private dataProvider: DataProvider) {
    this.personDialogVisible = false;
    this.personComponentTemplate = PersonFormTemplateVersion;
    this.personListComponentTemplate = PersonsListTemplateType;
  }

  setCurrentPerson(person: Person): void {
    this.createNewPerson = false;
    this.currentPerson = person;
    this.personDialogVisible = true;
  }

  addPerson(person: Person): void {
    if (this.isPersonValid(person)) {
      this.dataProvider.addNewPerson(person)
        .subscribe(() => {
            this.personDialogVisible = false;
            this.personListComponent.getPersons()
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    } else {
      this.personDialogVisible = false;
    }
  }

  changePerson(person: Person): void {
    this.dataProvider.changePerson(person)
      .subscribe(() => {
          this.personDialogVisible = false;
          this.personListComponent.getPersons();
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
  }

  deletePerson(person: Person): void {
    this.dataProvider.deletePerson(person.id)
      .subscribe(() => {
          this.personDialogVisible = false;
          this.personListComponent.getPersons();
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
  }

  isPersonValid(person: Person): boolean {
    if (person) {
      let values = Object.values(person);
      if (values.length > 0) {
        return true;
      }
    }
    return false;
  }

  createPerson(person: Person): void {
    this.currentPerson = person;
    this.createNewPerson = true;
    this.personDialogVisible = true;
  }
}


