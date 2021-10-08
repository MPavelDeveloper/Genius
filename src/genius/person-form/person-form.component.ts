import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person, Sex} from "../../model/person";
import {FormType} from "../family-form/family-form.component";
import {DataProvider} from "../services/data-provider.service";

export enum PersonFormTemplateVersion {
  FAMILY_FORM = 'familyForm',
  PERSON_EDITOR = 'personEditor',
}


@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})

export class PersonFormComponent implements OnInit{

  @Input() templateVersion: string;
  @Input() person: Person;
  @Input() personType: FormType;

  @Output() addedPerson = new EventEmitter<Person>();


  public personFormTemplateVersion;
  public selectPersonId: string;
  public PersonSex: Array<string>;
  public personsList: Array<Person>;
  public defaultPerson: Person;

  constructor(private DataProvider: DataProvider) {
    this.person = new Person();
    this.personFormTemplateVersion = PersonFormTemplateVersion;
    this.PersonSex = Object.values(Sex);
    this.selectPersonId = null;
  }

  ngOnInit() {
  }

  close() {
    this.addedPerson.emit(null)
  }

  addNewPerson() {
    this.addedPerson.emit(this.person);
  }

  getPersons() {
    const persons = this.DataProvider.getPersons();
    if (this.personType === FormType.FATHER) {
      this.personsList = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.Male))
    } else if (this.personType === FormType.MOTHER) {
      this.personsList = this.searchPersonsByCondition(persons, ((person: Person) => person.sex === Sex.Female))
    } else if (this.personType === FormType.CHILD){
      this.personsList = this.searchPersonsByCondition(persons, ((person: Person) => true))
    }

    if(this.selectPersonId === 'null') {
      this.person = new Person();
      return
    }

    if (this.selectPersonId) {
      this.person = this.DataProvider.findPerson(Number(this.selectPersonId));
    }
  }

  searchPersonsByCondition(persons: Array<Person>, condition: Function): Array<Person> {
    const result = persons.filter(person => condition(person));
    if (result.length > 0) {
      return result;
    }
    return undefined;
  }

}
