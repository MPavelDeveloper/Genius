import {FamilyEventType, LifeEvent, EventPrefix} from '../../../model/life-event';

export interface FamilyDTO {
  id?: number;
  husband: number;
  wife?: number;
  children?: Array<number>;
  note?: string;
  events: Array<number>;
}

interface PersonNameDTO {
  first: string;
  middle?: string;
  last?: string;
  maiden?: string;
}

export interface PersonDTO {
  id?: number;
  name: PersonNameDTO;
  gender: string;
  place?: string;
  occupation?: string;
  note?: string;
  events: Array<LifeEvent>;
  familyId?: number;
  parentFamilyId?: number;
}

export interface EventDTO {
  id?: number;
  type?: FamilyEventType;
  prefix?: EventPrefix;
  date: Date;
  place?: string;
  note?: string;
}
