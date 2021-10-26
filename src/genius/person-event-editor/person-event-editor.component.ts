import {Component} from '@angular/core';
import {PersonsListTemplateType} from '../person-list/person-list.component';
import {LifeEvent} from '../../model/life-event';
import {Person} from '../../model/person';
import {LifeEventDescriptor} from '../person/person.component';
import {
  LifeEventActionDescriptor,
  LifeEventFormAction,
  LifeEventFormType
} from '../life-event-form/life-event-form.component';
import {DataProvider} from '../services/data-provider';

@Component({
  selector: 'app-person-event-editor',
  templateUrl: './person-event-editor.component.html',
  styleUrls: ['./person-event-editor.component.scss']
})
export class PersonEventEditorComponent {

  public currentPerson: Person;
  public currentLifeEvent: LifeEvent;
  public lifeEventDialigVisable: Boolean;
  public personsListTemplateType;
  public lifeEventFormTemplateVersion: LifeEventFormType;

  constructor(private dataProvider: DataProvider) {
    this.personsListTemplateType = PersonsListTemplateType;
    this.lifeEventDialigVisable = false;
  }

  public setSelectedLifeEvent(lifeEventDescriptor: LifeEventDescriptor): void {
    this.currentPerson = lifeEventDescriptor.person;
    this.currentLifeEvent = lifeEventDescriptor.lifeEvent;
    this.lifeEventFormTemplateVersion = LifeEventFormType.EXIST_EVENT;
    this.lifeEventDialigVisable = true;
  }

  public createNewLifeEvent(person: Person): void {
    this.currentPerson = person;
    this.currentLifeEvent = new LifeEvent();
    this.lifeEventFormTemplateVersion = LifeEventFormType.NEW_EVENT;
    this.lifeEventDialigVisable = true;
  }

  public lifeEventHandler(lifeEventActionDescriptor: LifeEventActionDescriptor): void {
    if(lifeEventActionDescriptor) {
      if(lifeEventActionDescriptor.action === LifeEventFormAction.SAVE) {
        this.dataProvider.addNewLifeEvent(this.currentPerson, this.currentLifeEvent);
      }
      if(lifeEventActionDescriptor.action === LifeEventFormAction.DELETE) {
        this.dataProvider.deleteLifeEvent(this.currentPerson, this.currentLifeEvent);
      }
      if(lifeEventActionDescriptor.action === LifeEventFormAction.CHANGE) {
        this.dataProvider.changeLifeEvent(this.currentPerson, this.currentLifeEvent);
      }
    }

    this.lifeEventDialigVisable = false;
    console.log(lifeEventActionDescriptor);
  }

  public getFullPersonName(): string {
    return `${this.currentPerson.firstName}  ${this.currentPerson.middleName} ${this.currentPerson.lastName}`;
  }
}
