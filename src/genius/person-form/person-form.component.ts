import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Person, Sex} from "../../model/person";
import {FormType} from "../family-form/family-form.component";
import {DataProvider} from "../services/data-provider";

export enum PersonFormTemplateVersion {
  FAMILY_FORM = 'familyForm',
  PERSON_EDITOR = 'personEditor',
}

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {

  @Input() templateVersion: string;
  @Input() person: Person;
  @Input() personType: FormType;
  @Input() createNewPerson: Boolean;

  @Output() addedPerson = new EventEmitter<Person>();
  @Output() editedPerson = new EventEmitter<Person>();
  @Output() deletedPerson = new EventEmitter<Person>();

  public persons: Array<Person>;
  public personFormTemplateVersion;
  public selectPersonId: string;
  public PersonSex: Array<string>;
  public personsList: Array<Person>;

  constructor(private DataProvider: DataProvider) {
    this.personFormTemplateVersion = PersonFormTemplateVersion;
    this.PersonSex = Object.values(Sex);
    this.selectPersonId = null;
  }

  close() {
    this.addedPerson.emit(null)
  }

  addPerson() {
    this.addedPerson.emit(this.person);
  }

  getPersons() {
    this.DataProvider.getPersons().subscribe(persons => {
        this.persons = persons
        if (this.personType === FormType.FATHER) {
          this.personsList = this.searchPersonsByCondition(this.persons, ((person: Person) => person.sex === Sex.MALE))
        } else if (this.personType === FormType.MOTHER) {
          this.personsList = this.searchPersonsByCondition(this.persons, ((person: Person) => person.sex === Sex.FEMALE))
        } else if (this.personType === FormType.CHILD) {
          this.personsList = this.searchPersonsByCondition(this.persons, ((person: Person) => true))
        }

        if (this.selectPersonId === 'null') {
          this.person = new Person();
          return
        }

        if (this.selectPersonId) {
          this.DataProvider.findPerson(Number(this.selectPersonId)).subscribe(res => this.person = res,
            (err) => {
              if (err.error.status >= 400) {
                console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
              }
            })
        }
      },
      (err) => {
        if (err.error.status >= 400) {
          console.log(new Error(`Error status ${err.error.status}`))
        }
      })
  }

  searchPersonsByCondition(persons: Array<Person>, condition: Function): Array<Person> {
    const result = persons.filter(person => condition(person));
    if (result.length > 0) {
      return result;
    }
    return undefined;
  }

  editPerson() {
    this.editedPerson.emit(this.person)
  }

  deletePerson() {
    this.deletedPerson.emit(this.person)
  }
}
