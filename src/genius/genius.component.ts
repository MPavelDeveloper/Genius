import {Component, OnInit} from '@angular/core';
import {Person} from '../model/person'
import {DataServiceProvider} from './data-service-provider.service'




@Component({
  selector: 'app-genius',
  templateUrl: './genius.component.html',
  providers: [DataServiceProvider],
  styleUrls: ['./genius.component.scss']
})

export class GeniusComponent implements OnInit {

  public personsStruct: Array<Array<Array<Person>>> = [];


  constructor() {
  }

  ngOnInit() {
  }

}

