import {Component} from '@angular/core';

import {json} from '../data.module'


@Component({
  selector: 'app-root',
  templateUrl: './genius.component.html',
  styleUrls: ['./genius.component.scss']
})

export class GeniusComponent {
  data = JSON.parse(json);
  list = []

  constructor() {
  }

}
