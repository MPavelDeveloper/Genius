import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})



// ------- / Service Goal: getting JSON / ---------

export class DataServiceProvider {

  // constr
  constructor() { }

  // methods
  getJSON() {
    return localStorage.getItem('json');
  }
}
