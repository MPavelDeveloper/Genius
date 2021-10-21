export enum FamilyEventType {
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

export class FamilyEvent {
  public id: number;
  public type: FamilyEventType;
  public date: Date;
  public place: string;
  public note: string;
}
