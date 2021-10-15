import {Component, OnInit, EventEmitter, Output, Input, OnChanges, OnDestroy} from "@angular/core";
import {Person, Sex} from "../../model/person";
import {DataProvider} from "../services/data-provider";

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
      setTimeout(() => this.getPersonsList(), 900)
    }
  }

  getPersonsList(): void {
    this.dataProvider.getPersons().subscribe(res => {
        this.persons = res
      },
      (err) => {
        if (err.error.status >= 400) {
          console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
        }
      })
  }

  returnPerson(person: Person) {
    return this.returnedPerson.emit(person);
  }

  createPerson() {
    this.createNewPerson.emit(new Person());
  }
}
