import { Component, OnInit } from '@angular/core';
import { Person } from '../../model/person';
import { DataProvider } from '../services/data-provider';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public families: any;
  public persons: Array<Person>;

  constructor(private dataProvider: DataProvider) {
    this.persons = [];
  }

  ngOnInit() {
    this.dataProvider.getPersons().subscribe(persons => {
        this.persons = persons;
      },
      errorResponse => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }
}
