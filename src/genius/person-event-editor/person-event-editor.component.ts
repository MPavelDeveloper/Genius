import {Component, ViewChild} from '@angular/core';
import {PersonListComponent, PersonsListTemplateType} from '../person-list/person-list.component';
import {LifeEvent, LifeEventPrefix, LifeEventType} from '../../model/life-event';
import {Person} from '../../model/person';
import {LifeEventDescriptor} from '../person/person.component';
import {
  LifeEventActionDescriptor,
  LifeEventFormTemplateAction,
  LifeEventFormType
} from '../life-event-form/life-event-form.component';
import {DataProvider} from '../services/data-provider';
import {LifeEventTemplateAction} from '../life-event/life-event.component';

@Component({
  selector: 'app-person-event-editor',
  templateUrl: './person-event-editor.component.html',
  styleUrls: ['./person-event-editor.component.scss']
})
export class PersonEventEditorComponent {
  @ViewChild(PersonListComponent, {static: false})
  private personListComponent: PersonListComponent;
  public currentPerson: Person;
  public currentLifeEvent: LifeEvent;
  public lifeEventFormTemplateVersion: LifeEventFormType;
  public personsListTemplateType;
  public lifeEventDialigVisable: Boolean;
  public deleteConfirmationDialogVisable: boolean;

  constructor(private dataProvider: DataProvider) {
    this.personsListTemplateType = PersonsListTemplateType;
    this.lifeEventDialigVisable = false;
  }

  public setSelectedLifeEvent(lifeEventDescriptor: LifeEventDescriptor): void {
    if (lifeEventDescriptor.action === LifeEventTemplateAction.GET) {
      this.currentPerson = lifeEventDescriptor.person;
      this.currentLifeEvent = this.cloneLifeEvent(lifeEventDescriptor.lifeEvent);
      this.lifeEventFormTemplateVersion = LifeEventFormType.EXIST_EVENT;
      this.lifeEventDialigVisable = true;
    } else {
      this.currentPerson = lifeEventDescriptor.person;
      this.currentLifeEvent = lifeEventDescriptor.lifeEvent;
      this.deleteConfirmationDialogVisable = true;
    }
  }

  public createNewLifeEvent(person: Person): void {
    this.currentPerson = person;
    this.currentLifeEvent = new LifeEvent();
    this.currentLifeEvent.type = LifeEventType.DEFAULT;
    this.currentLifeEvent.prefix = LifeEventPrefix.NONE;
    this.currentLifeEvent.date;
    this.lifeEventFormTemplateVersion = LifeEventFormType.NEW_EVENT;
    this.lifeEventDialigVisable = true;
  }

  public lifeEventHandler(lifeEventActionDescriptor: LifeEventActionDescriptor): void {
    if (lifeEventActionDescriptor) {
      if (lifeEventActionDescriptor.action === LifeEventFormTemplateAction.SAVE) {
        this.dataProvider.addNewLifeEvent(this.currentPerson, this.currentLifeEvent).subscribe(() => {
            this.personListComponent.getPersons();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      }
      if (lifeEventActionDescriptor.action === LifeEventFormTemplateAction.DELETE) {
        this.dataProvider.deleteLifeEvent(this.currentPerson, this.currentLifeEvent).subscribe(() => {
            this.personListComponent.getPersons();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      }
      if (lifeEventActionDescriptor.action === LifeEventFormTemplateAction.CHANGE) {
        this.dataProvider.deleteLifeEvent(this.currentPerson, this.currentLifeEvent).subscribe(() => {
            this.dataProvider.addNewLifeEvent(this.currentPerson, this.currentLifeEvent).subscribe(() => {
                this.personListComponent.getPersons();
              },
              (errorResponse) => {
                console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
              });
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      }
    }
    this.lifeEventDialigVisable = false;
  }

  public cloneLifeEvent(lifeEvent: LifeEvent): LifeEvent {
    let cloneLifeEvent = {}
    Object.assign(cloneLifeEvent, lifeEvent)
    return cloneLifeEvent;
  }

  public getFullPersonName(): string {
    return `${(this.currentPerson.firstName) ? this.currentPerson.firstName : ''}` +
      ` ${(this.currentPerson.middleName) ? this.currentPerson.middleName : ''}` +
      ` ${(this.currentPerson.lastName) ? this.currentPerson.lastName : ''}`;
  }

  confirmActionHandler(deletePersonEventFlag: boolean) {
    this.deleteConfirmationDialogVisable = false;
    if(deletePersonEventFlag) {
      this.dataProvider.deleteLifeEvent(this.currentPerson, this.currentLifeEvent).subscribe(() => {
          this.personListComponent.getPersons();
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    }
  }
}
