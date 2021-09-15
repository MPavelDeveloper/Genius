
export enum Events {
  birthDay = 'birthday',
  deathDay = 'date of death',
  wedding = 'wedding',
  rewarding = 'rewarding',
  moving = 'moving',
  graduation = 'graduation',
}

export class LifeEvent {
  // props
  date: Date;
  type: Events;
  description: string;

  // const
  constructor(date: Date, type: Events, description: string) {
    this.date = date;
    this.type = type;
    this.description = description
  }


}
