export enum Events {
  birthDay = 'birthday',
  deathDay = 'date of death',
  wedding = 'wedding',
  rewarding = 'rewarding',
  moving = 'moving',
  graduation = 'graduation',
}

export class LifeEvent {

  public date: Date;
  public type: Events;
  public description: string;

  constructor(date: Date, type: Events, description: string) {
    this.date = date;
    this.type = type;
    this.description = description;
  }
}
