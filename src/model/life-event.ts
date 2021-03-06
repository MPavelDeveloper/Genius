export enum FamilyEventType {
  DEFAULT = 'Other',
  BIRTH = 'Birth',
  DEATH = 'Death',
  ENGAGEMENT = 'Engagement',
  MARRIED = 'Married',
  DIVORCE = 'Divorce',
  ADOPTION = 'Adoption',
  CHRISTENING = 'Christening',
  RELOCATION = 'Relocation',
  EDUCATION = 'Education',
  EMIGRATION = 'Emigration',
  GET_JOB = 'GetJob',
  GRADUATION = 'Graduation',
  RETIREMENT = 'Retirement',
  IMMIGRATION = 'Immigration',
}

export enum LifeEventType {
  DEFAULT = 'Other',
  BIRTH = 'Birth',
  DEATH = 'Death',
  ENGAGEMENT = 'Engagement',
  MARRIED = 'Marriage',
  DIVORCE = 'Divorce',
  ADOPTION = 'Adoption',
  CHRISTENING = 'Christening',
  RELOCATION = 'Relocation',
  EDUCATION = 'Education',
  EMIGRATION = 'Emigration',
  GET_JOB = 'GetJob',
  GRADUATION = 'Graduation',
  RETIREMENT = 'Retirement',
  IMMIGRATION = 'Immigration',
}

export enum EventPrefix {
  NONE = 'None',
  BEFORE = 'Before',
  ABOUT = 'About',
  AFTER = 'After',
}

export class LifeEvent {
  public id?: number;
  public type?: LifeEventType | FamilyEventType;
  public prefix?: EventPrefix;
  public date?: Date;
  public place?: string;
  public note?: string;
}
