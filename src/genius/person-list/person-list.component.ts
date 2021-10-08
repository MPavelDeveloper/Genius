import { Component, OnInit } from '@angular/core';
import {DataProvider} from "../services/data-provider.service";

@Component({
  selector: 'person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private dataProvider: DataProvider) { }

  ngOnInit(): void {
    this.getPersonsList()
  }

  getPersonsList() {
    return this.dataProvider.getPersons();
  }

}
