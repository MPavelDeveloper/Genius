import { Injectable } from '@angular/core';
import {Person} from '../../../model/person';
import {FamilyFormTemplateVersion, PersonType} from '../../family.components/family-form/family-form.component';
import {PersonFormTemplateVersion} from '../../person.components/person-form/person-form.component';
import {Family} from '../../../model/family';

export enum ComponentDescriptor {
  FAMILY_FORM = 'familyForm',
  PERSON_FORM = 'personForm',
}

@Injectable({
  providedIn: 'root'
})
export class SelectPersonTransferService {

  public componentDescriptor: ComponentDescriptor;
  public person: Person;
  public personType: PersonType;
  public familyId: number;
  public family: Family;
  public currentChildIndex: number;
  public personFormTemplateVersion: PersonFormTemplateVersion;
  public familyFormTemplateVersion: FamilyFormTemplateVersion;

  constructor() { }
}
