import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Person, Sex } from '../../model/person';
import { DataProvider } from '../services/data-provider';

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnChanges {

  @Input() reloadData: Boolean;
  @Output() returnedPerson = new EventEmitter<Person>();
  @Output() reloadedPersons = new EventEmitter<Boolean>();
  @Output() createNewPerson = new EventEmitter<Person>();

  public persons: Array<Person>;
  public personSex;

  constructor(private dataProvider: DataProvider) {
    this.personSex = Sex;
  }

  public ngOnInit(): void {
    this.loadPersons()
  }

  public ngOnChanges() {
    if (this.reloadData) {
      this.loadPersons()
    }
  }

  private loadPersons(): void {
    this.dataProvider.getPersons().subscribe( persons => {
        this.persons = persons;
      },
      errorResponse => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public returnPerson(person: Person) {
    return this.returnedPerson.emit(person);
  }

  public createPerson() {
    this.createNewPerson.emit(new Person());
  }
}
