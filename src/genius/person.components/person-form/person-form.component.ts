import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person, Sex} from '../../../model/person';
import {FormType} from '../../family.components/family-form/family-form.component';
import {DataProvider} from '../../services/data-provider';
import {ActivatedRoute} from '@angular/router';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction,
  LifeEventTemplateVersion
} from '../../life-event/life-event.component';
import {LifeEvent} from '../../../model/life-event';
import {
  LifeEventFormActionDescriptor,
  LifeEventFormTemplateAction, LifeEventFormType
} from '../../life-event-form/life-event-form.component';

export enum PersonFormTemplateVersion {
  FAMILY_FORM = 'familyForm',
  PERSON_EDITOR = 'personEditor',
  PERSON_VIEW = 'view',
  PERSON_EDIT = 'edit',
  PERSON_NEW = 'new',
}

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {

  @Input() templateVersion: string;
  @Input() person: Person;
  @Input() personType: FormType;
  @Input() createNewPerson: Boolean;

  @Output() addedPerson = new EventEmitter<Person>();
  @Output() editedPerson = new EventEmitter<Person>();
  @Output() deletedPerson = new EventEmitter<Person>();

  public personClone: Person;
  public lifeEvent: LifeEvent
  public lifeEventClone: LifeEvent;
  public persons: Array<Person>;
  public personFormTemplateVersion;
  public selectPersonId: string;
  public PersonSex: Array<string>;
  public lifeEventTemplateVersion;
  public lifeEventFormTemplateVersion;
  public confirmDialogVisiable: Boolean;
  public lifeEventFormDialogVisiable: Boolean;

  constructor(private dataProvider: DataProvider, private activateRoute: ActivatedRoute) {
    this.person = new Person();
    this.templateVersion = PersonFormTemplateVersion.PERSON_NEW;
    this.selectPersonId = null;
    this.PersonSex = Object.values(Sex);
    this.personFormTemplateVersion = PersonFormTemplateVersion;
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
    this.lifeEventFormTemplateVersion = LifeEventFormType;
  }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.params.id) {
      this.dataProvider.findPerson(Number(this.activateRoute.snapshot.params.id)).subscribe(person => {
          this.person = person
          this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    }
  }

  public close(): void {
    this.addedPerson.emit(null);
  }

  public addPerson(): void {
    this.addedPerson.emit(this.person);
  }

  public editPerson(): void {
    this.editedPerson.emit(this.person);
  }

  public deletePerson(): void {
    this.deletedPerson.emit(this.person);
  }

  public loadPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        if (this.personType === FormType.FATHER) {
          this.persons = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.MALE))
        } else if (this.personType === FormType.MOTHER) {
          this.persons = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.FEMALE))
        } else if (this.personType === FormType.CHILD) {
          this.persons = persons;
        }

        if (this.selectPersonId) {
          this.dataProvider.findPerson(Number(this.selectPersonId)).subscribe(person => {
              this.person = person;
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            })
        } else {
          this.person = new Person();
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

  // new functions
  public toggleEdit(): void {
    this.templateVersion = PersonFormTemplateVersion.PERSON_EDIT;
    this.personClone = this.personDeepClone(this.person);
  }

  public savePerson(): void {
    if (this.person.id) {
      this.dataProvider.changePerson(this.personClone).subscribe(() => {
          this.reloadPerson()
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    } else {
      this.dataProvider.addNewPerson(this.person).subscribe(null,
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    }
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public lifeEventHandler(lifeEventActionDescriptor: LifeEventActionDescriptor) {
    if (lifeEventActionDescriptor.action === LifeEventTemplateAction.DELETE) {
      this.confirmDialogVisiable = true;
      this.lifeEvent = lifeEventActionDescriptor.lifeEvent;
      this.lifeEventClone = this.lifeEventSimpleClone(lifeEventActionDescriptor.lifeEvent);
    } else if (lifeEventActionDescriptor.action === LifeEventTemplateAction.GET) {
      this.lifeEventFormDialogVisiable = true;
      this.lifeEvent = lifeEventActionDescriptor.lifeEvent;
      this.lifeEventClone = this.lifeEventSimpleClone(lifeEventActionDescriptor.lifeEvent);
    }
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

  public exit(): void {
    this.templateVersion = PersonFormTemplateVersion.PERSON_VIEW;
  }

  public personDeepClone(person: Person): Person {
    return JSON.parse(JSON.stringify(person))
  }

  public lifeEventSimpleClone(lifeEvent: LifeEvent): LifeEvent {
    let lifeEventClone = {};
    Object.assign(lifeEventClone, lifeEvent);
    return lifeEventClone;
  }

  getPersonFullName() {
    return `${(this.person.firstName) ? this.person.firstName : ''}` +
      ` ${(this.person.middleName) ? this.person.middleName : ''}` +
      ` ${(this.person.lastName) ? this.person.lastName : ''}`;
  }

  public lifeEventFormHandler(lifeEventFormActionDescriptor: LifeEventFormActionDescriptor): void {
    this.lifeEventFormDialogVisiable = false;
    if (lifeEventFormActionDescriptor) {
      if (lifeEventFormActionDescriptor.action === LifeEventFormTemplateAction.CHANGE) {
        this.dataProvider.deletePersonEvent(this.person.id, lifeEventFormActionDescriptor.lifeEvent).subscribe(() => {
            this.dataProvider.addNewPersonEvent(this.person.id, lifeEventFormActionDescriptor.lifeEvent).subscribe(() => {
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
    }
  }

  reloadPerson() {
    this.dataProvider.findPerson(this.person.id).subscribe(person => {
        this.person = person;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }
}
