import {Component, OnInit} from '@angular/core';
import {DataServiceProvider} from '../data-service-provider.service'
import {Person} from "../../model/person";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  public genusStruct: Array<Array<Array<Person>>>;


  constructor(private dataServiceProvider: DataServiceProvider) {
    dataServiceProvider.parsJson()
    this.genusStruct = dataServiceProvider.genusStruct;
  }

  ngOnInit(): void {
    console.log(this.genusStruct)
  }

}
