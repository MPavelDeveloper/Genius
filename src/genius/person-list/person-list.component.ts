import {Component, OnInit, EventEmitter, Output, Input, OnChanges, OnDestroy} from '@angular/core';
import {Person, Sex} from '../../model/person';
import {DataProvider} from '../services/data-provider';

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

  ngOnInit(): void {
    this.getPersonsList()
  }

  ngOnChanges() {
    if (this.reloadData) {
      this.getPersonsList()
    }
  }

  getPersonsList(): void {
    this.dataProvider.getPersons().subscribe( HttpResponseAddPerson => {
        this.persons = HttpResponseAddPerson;
      },
      (errorHttpResponseAddPerson) => {
        console.error(`Error status: ${errorHttpResponseAddPerson.error.status}\n Error message: ${errorHttpResponseAddPerson.error.message}\n Error path: ${errorHttpResponseAddPerson.error.path}\n`);
      });
  }

  returnPerson(person: Person) {
    return this.returnedPerson.emit(person);
  }

  createPerson() {
    this.createNewPerson.emit(new Person());
  }
}
