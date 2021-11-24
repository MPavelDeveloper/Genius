import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Person, Sex} from '../../../model/person';
import {PersonType} from '../../family.components/family-form/family-form.component';
import {DataProvider} from '../../services/data-provider';
import {ActivatedRoute} from '@angular/router';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction,
} from '../../event.components/life-event/life-event.component';
import {EventPrefix, LifeEvent, LifeEventType} from '../../../model/life-event';
import {
  LifeEventFormActionDescriptor,
  LifeEventFormTemplateAction,
  LifeEventFormType
} from '../../event.components/life-event-form/life-event-form.component';
import {PersonTemplateType} from '../person/person.component';
import {
  ComponentDescriptor,
  SelectPersonTransferService
} from '../../services/select-person-transfer/select-person-transfer.service';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';

export enum PersonFormTemplateVersion {
  PERSON_VIEW = 'view',
  PERSON_EDIT = 'edit',
  PERSON_CREATE = 'create',
  PERSON_SELECT = 'select',
}

export enum PersonFormPath {
  EDIT = 'viewPerson/:id',
  ADD_IN_EXIST_FAMILY = 'selectPerson',
  ADD_IN_NEW_FAMILY = 'addPersonInNewFamily'
}

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public currentPersonFormPath: PersonFormPath;
  public confirmDialogVisible: Boolean;
  public lifeEventFormType: LifeEventFormType;
  public lifeEventFormDialogVisible: Boolean;
  public personFormPath;
  public personFormTemplateVersion;
  public lifeEventFormTemplateVersion;
  public personTemplateType;
  public personSex;

  constructor(private dataProvider: DataProvider,
              private activateRoute: ActivatedRoute,
              private selectPersonTransferService: SelectPersonTransferService,
              private dataLoad: DataLoadService,
              private changeDetection: ChangeDetectorRef) {
    this.person = new Person();
    this.templateVersion = PersonFormTemplateVersion.PERSON_CREATE;
    this.PersonSex = Object.values(Sex);
    this.personFormTemplateVersion = PersonFormTemplateVersion;
    this.lifeEventFormTemplateVersion = LifeEventFormType;
    this.personFormPath = PersonFormPath;
    this.personTemplateType = PersonTemplateType;
    this.personSex = Sex;
  }

  ngOnInit(): void {
    console.log(this.activateRoute.snapshot.params.id);
    if (this.activateRoute.snapshot && this.activateRoute.snapshot.routeConfig) {
      let path = <PersonFormPath>this.activateRoute.snapshot.routeConfig.path;
      this.currentPersonFormPath = path;
      if (path === PersonFormPath.EDIT) {
        this.dataProvider.findPerson(Number(this.activateRoute.snapshot.params.id)).subscribe(person => {
            this.person = person;
            this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
            this.changeDetection.detectChanges();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      } else if (path === PersonFormPath.ADD_IN_EXIST_FAMILY) {
        this.person = this.selectPersonTransferService.person;
        this.familyId = this.selectPersonTransferService.family.id;
        this.personType = this.selectPersonTransferService.personType;
        this.templateVersion = this.selectPersonTransferService.personFormTemplateVersion;
        this.loadPersons();
      } else if (path === PersonFormPath.ADD_IN_NEW_FAMILY) {
        this.person = this.selectPersonTransferService.person;
        this.personType = this.selectPersonTransferService.personType;
        this.templateVersion = this.selectPersonTransferService.personFormTemplateVersion;
        this.loadPersons();
      }
    } else {
      this.loadPersons();
    }
  }

  public loadPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        if (this.personType === PersonType.HUSBAND) {
          this.persons = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.MALE));
        } else if (this.personType === PersonType.WIFE) {
          this.persons = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.FEMALE));
        } else if (this.personType === PersonType.CHILD) {
          this.persons = persons;
        }
        this.changeDetection.detectChanges();
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
    this.changeDetection.detectChanges();
    this.templateVersion = PersonFormTemplateVersion.PERSON_EDIT;
  }

  public savePerson(): void {
    this.dataProvider.addNewPerson(this.person).subscribe(() => {
        this.dataLoad.reloadPersons(true);
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public selectPerson(): void {
    this.selectPersonTransferService.componentDescriptor = ComponentDescriptor.PERSON_FORM;
    this.selectPersonTransferService.person = this.person;
  }

  public changePerson(): void {
    this.dataProvider.changePerson(this.personClone).subscribe(() => {
        this.reloadPerson();
        this.dataLoad.reloadPersons(true);
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public lifeEventHandler(lifeEventActionDescriptor: LifeEventActionDescriptor) {
    if (lifeEventActionDescriptor.action === LifeEventTemplateAction.DELETE) {
      this.confirmDialogVisible = true;
      this.lifeEvent = lifeEventActionDescriptor.lifeEvent;
      this.lifeEventClone = this.lifeEventSimpleClone(lifeEventActionDescriptor.lifeEvent);
    } else if (lifeEventActionDescriptor.action === LifeEventTemplateAction.GET) {
      this.lifeEventFormType = LifeEventFormType.EXIST_EVENT;
      this.lifeEventFormDialogVisible = true;
      this.lifeEvent = lifeEventActionDescriptor.lifeEvent;
      this.lifeEventClone = this.lifeEventSimpleClone(lifeEventActionDescriptor.lifeEvent);
    }
  }

  public lifeEventFormHandler(lifeEventFormActionDescriptor: LifeEventFormActionDescriptor): void {
    this.lifeEventFormDialogVisible = false;
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
            this.reloadPerson();
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
        this.reloadPerson();
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public confirmActionHandler(confirmAction: ConfirmAction): void {
    this.confirmDialogVisible = false;
    if (confirmAction === ConfirmAction.OK) {
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
    this.lifeEventClone.prefix = EventPrefix.NONE;
    this.lifeEventFormDialogVisible = true;
  }

  public personDeepClone(person: Person): Person {
    return JSON.parse(JSON.stringify(person));
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
        this.changeDetection.detectChanges();
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public setChangePerson(person: Person) {
    this.person = person;
  }

  public closePersonSelect() {
    this.selectPersonTransferService.componentDescriptor = ComponentDescriptor.PERSON_FORM;
  }

  public getRouterLink(): [string, number | string] {
    if (this.currentPersonFormPath === PersonFormPath.ADD_IN_EXIST_FAMILY) {
      return ['/editFamily', this.familyId];
    } else if (this.currentPersonFormPath === PersonFormPath.ADD_IN_NEW_FAMILY) {
      return ['/createFamily', ''];
    }

    return undefined;
  }

}
