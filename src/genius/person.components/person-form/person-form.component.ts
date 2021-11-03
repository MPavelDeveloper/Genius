import {Component, Input, OnInit} from '@angular/core';
import {Person, Sex} from '../../../model/person';
import {PersonType} from '../../family.components/family-form/family-form.component';
import {DataProvider} from '../../services/data-provider';
import {ActivatedRoute} from '@angular/router';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction,
  LifeEventTemplateVersion
} from '../../event.components/life-event/life-event.component';
import {LifeEvent, LifeEventPrefix, LifeEventType} from '../../../model/life-event';
import {
  LifeEventFormActionDescriptor,
  LifeEventFormTemplateAction,
  LifeEventFormType
} from '../../event.components/life-event-form/life-event-form.component';
import {PersonTemplateType} from '../person/person.component';
import {ComponentDescriptor, SelectPersonTransferService} from '../../services/select-person-transfer/select-person-transfer.service';

export enum PersonFormTemplateVersion {
  PERSON_VIEW = 'view',
  PERSON_EDIT = 'edit',
  PERSON_CREATE = 'create',
  PERSON_SELECT = 'select',
}

export enum PersonFormPath {
  EDIT = 'viewPerson/:id',
  SELECT = 'selectPerson',
}

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  @Input() templateVersion: string;
  @Input() person: Person;
  @Input() personType: PersonType;

  public familyId: number;
  public persons: Array<Person>;
  public personClone: Person;
  public lifeEvent: LifeEvent
  public lifeEventClone: LifeEvent;
  public PersonSex: Array<string>;
  public confirmDialogVisiable: Boolean;
  public lifeEventFormType: LifeEventFormType;
  public lifeEventFormDialogVisiable: Boolean;
  public personFormTemplateVersion;
  public lifeEventTemplateVersion;
  public lifeEventFormTemplateVersion;
  public personTemplateType;
  public personSex;

  constructor(private dataProvider: DataProvider, private activateRoute: ActivatedRoute, private familyPerson: SelectPersonTransferService) {
    this.person = new Person();
    this.templateVersion = PersonFormTemplateVersion.PERSON_CREATE;
    this.PersonSex = Object.values(Sex);
    this.personFormTemplateVersion = PersonFormTemplateVersion;
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
    this.lifeEventFormTemplateVersion = LifeEventFormType;
    this.personTemplateType = PersonTemplateType;
    this.personSex = Sex;
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot && this.activateRoute.snapshot.routeConfig) {
      let path = this.activateRoute.snapshot.routeConfig.path;
      if (path === PersonFormPath.EDIT) {
        this.dataProvider.findPerson(Number(this.activateRoute.snapshot.params.id)).subscribe(person => {
            this.person = person
            this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      } else if (path === PersonFormPath.SELECT) {
        this.person = this.familyPerson.person;
        this.familyId = this.familyPerson.familyClone.id;
        this.personType = this.familyPerson.personType;
        this.templateVersion = this.familyPerson.personFormTemplateVersion;
        this.loadPersons();
      }

    } else {
      this.loadPersons()
    }
  }

  public loadPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        if (this.personType === PersonType.HUSBAND) {
          this.persons = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.MALE))
        } else if (this.personType === PersonType.WIFE) {
          this.persons = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.FEMALE))
        } else if (this.personType === PersonType.CHILD) {
          this.persons = persons;
        }
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }

  private searchPersonsByCondition(persons: Array<Person>, condition: Function): Array<Person> {
    const result = persons.filter(person => condition(person));
    if (result.length > 0) {
      return result;
    }
    return undefined;
  }

  public toggleViewEditPerson(): void {
    this.personClone = this.personDeepClone(this.person);
    this.templateVersion = PersonFormTemplateVersion.PERSON_EDIT;
  }

  public savePerson(): void {
    this.dataProvider.addNewPerson(this.person).subscribe(response => {
        console.log(response)
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public selectPerson(): void {
    this.familyPerson.componentDescriptor = ComponentDescriptor.PERSON_FORM;
    this.familyPerson.person = this.person;
  }

  public changePerson(): void {
    this.dataProvider.changePerson(this.personClone).subscribe(() => {
        this.reloadPerson()
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public lifeEventHandler(lifeEventActionDescriptor: LifeEventActionDescriptor) {
    if (lifeEventActionDescriptor.action === LifeEventTemplateAction.DELETE) {
      this.confirmDialogVisiable = true;
      this.lifeEvent = lifeEventActionDescriptor.lifeEvent;
      this.lifeEventClone = this.lifeEventSimpleClone(lifeEventActionDescriptor.lifeEvent);
    } else if (lifeEventActionDescriptor.action === LifeEventTemplateAction.GET) {
      this.lifeEventFormType = LifeEventFormType.EXIST_EVENT;
      this.lifeEventFormDialogVisiable = true;
      this.lifeEvent = lifeEventActionDescriptor.lifeEvent;
      this.lifeEventClone = this.lifeEventSimpleClone(lifeEventActionDescriptor.lifeEvent);
    }
  }

  public lifeEventFormHandler(lifeEventFormActionDescriptor: LifeEventFormActionDescriptor): void {
    this.lifeEventFormDialogVisiable = false;
    if (lifeEventFormActionDescriptor) {
      if (lifeEventFormActionDescriptor.action === LifeEventFormTemplateAction.CHANGE) {
        this.changeLifeEvent(this.person.id, lifeEventFormActionDescriptor.lifeEvent);
      } else if (lifeEventFormActionDescriptor.action === LifeEventFormTemplateAction.SAVE) {
        this.saveLifeEvent(this.person.id, lifeEventFormActionDescriptor.lifeEvent);
      }
    }
  }

  public changeLifeEvent(personId: number, lifeEvent: LifeEvent): void {
    this.dataProvider.deletePersonEvent(personId, lifeEvent).subscribe(() => {
        this.dataProvider.addNewPersonEvent(personId, lifeEvent).subscribe(() => {
            this.reloadPerson()
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public saveLifeEvent(personId: number, lifeEvent: LifeEvent): void {
    this.dataProvider.addNewPersonEvent(personId, lifeEvent).subscribe(() => {
        this.reloadPerson()
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public deleteLifeEvent(deleteLifeEventFlag: boolean): void {
    this.confirmDialogVisiable = false;
    if (deleteLifeEventFlag) {
      this.dataProvider.deletePersonEvent(this.person.id, this.lifeEventClone)
        .subscribe(() => {
            this.reloadPerson();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    }
  }

  public createLifeEvent() {
    this.lifeEventFormType = LifeEventFormType.NEW_EVENT;
    this.lifeEventClone = new LifeEvent();
    this.lifeEventClone.type = LifeEventType.DEFAULT;
    this.lifeEventClone.prefix = LifeEventPrefix.NONE;
    this.lifeEventFormDialogVisiable = true;
  }

  public personDeepClone(person: Person): Person {
    return JSON.parse(JSON.stringify(person))
  }

  public lifeEventSimpleClone(lifeEvent: LifeEvent): LifeEvent {
    let lifeEventClone = {};
    Object.assign(lifeEventClone, lifeEvent);
    return lifeEventClone;
  }

  public exit(): void {
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public getPersonFullName() {
    return `${(this.person.firstName) ? this.person.firstName : ''}` +
      ` ${(this.person.middleName) ? this.person.middleName : ''}` +
      ` ${(this.person.lastName) ? this.person.lastName : ''}`;
  }

  private reloadPerson() {
    this.dataProvider.findPerson(this.person.id).subscribe(person => {
        this.person = person;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public setChangePerson(person: Person) {
    this.person = person;
  }

  public closePersonSelect() {
    this.familyPerson.componentDescriptor = ComponentDescriptor.PERSON_FORM;
  }
}
