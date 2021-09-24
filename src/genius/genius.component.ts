import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person'
import { DataProvider } from './services/data-provider.service'

@Component({
  selector: 'genius',
  templateUrl: './genius.component.html',
  styleUrls: ['./genius.component.scss']
})
export class GeniusComponent implements OnInit {

  public persons: Array<Person>;

  constructor(private dataProvider: DataProvider) {
  }

  ngOnInit() {
    this.persons = this.dataProvider.getPersons();
  }
}

