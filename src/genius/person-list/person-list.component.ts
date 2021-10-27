import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Person, Sex} from '../../model/person';
import {DataProvider} from '../services/data-provider';
import {LifeEventDescriptor, PersonsTemplateType} from '../person/person.component';

export enum PersonsListTemplateType {
  PERSONS = 'persons',
  PERSONS_EVENTS = 'persons_events',
}

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnChanges {
  @Input() templateVersion: PersonsListTemplateType;
  @Input() reloadData: Boolean;
  @Output() returnedPerson = new EventEmitter<Person>();
  @Output() createNewPerson = new EventEmitter<Person>();
  @Output() returnedExistLifeEvent = new EventEmitter<LifeEventDescriptor>();
  @Output() createNewLifeEvent = new EventEmitter<Person>();
  public persons: Array<Person>;
  public personSex;
  public personsListTemplateVersion;
  public personTemplateVersion;

  constructor(private dataProvider: DataProvider) {
    this.personSex = Sex;
    this.personsListTemplateVersion = PersonsListTemplateType;
    this.personTemplateVersion = PersonsTemplateType;
  }

  public ngOnInit(): void {
    this.getPersons();
  }

  public ngOnChanges() {
    if (this.reloadData) {
      this.getPersons();
    }
  }

  public getPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        this.persons = persons;
      },
      errorResponse => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public returnExistPerson(person: Person) {
    console.log(person)
    return this.returnedPerson.emit(person);
  }

  public createPerson() {
    this.createNewPerson.emit(new Person());
  }

  public returnExistPersonLifeEvent(descriptor:LifeEventDescriptor) {
    return this.returnedExistLifeEvent.emit(descriptor);
  }

  public createNewPersonLifeEvent(person: Person) {
    return this.createNewLifeEvent.emit(person);
  }
}
