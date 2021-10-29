import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Person, Sex} from '../../model/person';
import {DataProvider} from '../services/data-provider';
import {PersonsListTemplateType} from '../person.components/person-list/person-list.component';
import {PersonTemplateType} from '../person.components/person/person.component';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public persons: Array<Person>;
  public currentPersonIndex: number;
  public showConfirmDialog: boolean;
  public personListTemplateType;
  public personTemplateType;
  public gender;

  constructor(private dataProvider: DataProvider) {
    this.persons = [];
    this.personListTemplateType = PersonsListTemplateType;
    this.personTemplateType = PersonTemplateType;
    this.gender = Sex;
  }

  ngOnInit() {
    this.dataProvider.getPersons().subscribe(persons => {
        this.persons = persons;
      },
      errorResponse => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }


  showConfirm(personIndex: number): void {
    this.currentPersonIndex = personIndex;
    this.showConfirmDialog = true;
  }

  deletePerson(deletePersonFlag: boolean): void {
    if(deletePersonFlag) {
      this.dataProvider.deletePerson(this.getPersonId(this.currentPersonIndex))
        .subscribe(() => {
            this.dataProvider.getPersons()
              .subscribe(persons => {
                  this.persons = persons;
                },
                (errorResponse) => {
                  console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
                });
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    }
    this.showConfirmDialog = false;
  }

  getPersonId(personIndex: number): number {
    return this.persons[personIndex].id;
  }
}
