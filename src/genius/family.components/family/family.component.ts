import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Family} from '../../../model/family';
import {PersonTemplateType} from '../../person.components/person/person.component';

@Component({
  selector: 'family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent{

  @Input() family: Family;
  @Output() returnedFamily = new EventEmitter<Family>();
  personTemplateType;

  constructor() {
    this.personTemplateType = PersonTemplateType;
  }

  public returnFamily(): void {
    this.returnedFamily.emit(this.family);
  }
}
