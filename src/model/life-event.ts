export enum LifeEventType {
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

export enum LifeEventPrefix {
  NONE = 'none',
  BEFORE = 'before',
  ABOUT = 'about',
  AFTER = 'after',
}

export class LifeEvent {
  public id?: number;
  public type: LifeEventType;
  public prefix?: LifeEventPrefix;
  public date: Date;
  public place?: string;
  public note: string;
}
