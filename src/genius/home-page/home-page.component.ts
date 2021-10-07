import { Component, OnInit } from '@angular/core';
import {Person} from "../../model/person";
import {DataProvider} from "../services/data-provider.service";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public persons: Array<Person>;

  constructor(private dataProvider: DataProvider) { }

  ngOnInit(): void {
    this.persons = this.dataProvider.getPersons();
  }

}
