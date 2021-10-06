import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Family} from "../../model/family";

@Component({
  selector: 'family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent {

  @Input() family: Family;

  @Output() returnedFamily = new EventEmitter<Family>();

  returnFamily() {
    console.log(this.family);
    this.returnedFamily.emit(this.family);
  }


}
