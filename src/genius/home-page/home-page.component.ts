import {Component, OnInit} from '@angular/core';
import {Person} from '../../model/person';
import {DataProvider} from '../services/data-provider';

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
    this.dataProvider.getPersons().subscribe((res: Array<Person>) => {
        this.persons = res;
      },
      (err) => {
        if (err.error.status >= 400) {
          console.error(new Error(`Error status: ${err.error.status}\n Error message: ${err.error.message}\n Error path: ${err.error.path}\n`));
        }
      })
  }
}
