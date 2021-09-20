import {Component, OnInit} from '@angular/core';
import {Person} from '../model/Person'
import {ParsService} from './pars-service.service'
import {DataServiceProvider} from './dataServiceProvider.service'



@Component({
  selector: 'app-genius',
  templateUrl: './genius.component.html',
  // add service's
  providers: [ParsService, DataServiceProvider],
  styleUrls: ['./genius.component.scss']
})



// ------------ / Component - Render / -------------
export class GeniusComponent implements OnInit {

  // props
  public personsStruct: Array<Array<Array<Person>>> = [];


  // constr
  constructor(private pars: ParsService) {
  }

  // DOitFirst
  ngOnInit() {
    this.pars.parsData();
    if (this.pars.genusStruct.length !== 0) {
      this.personsStruct = this.pars.genusStruct;
    }
    console.log(this.personsStruct);
  }

}

