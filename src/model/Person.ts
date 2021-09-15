import {Family} from "./Family";
import {LifeEvent} from "./LifeEvent";

enum Sex {
  m = 'm',
  w = 'w',
}

export class Person {

  // props
  private id: string;
  private firstName: string;
  private lastName: string;
  private middleName: string;
  private age: number;
  private sex: Sex;
  private lifeEvent: Array<LifeEvent>;
  private family: Family;


  // const
  constructor(id: string, firstName: string, lastName: string, middleName: string, age: number, sex: Sex,family: Family, lifeEvent: Array<LifeEvent>) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.age = age;
    this.sex = sex;
    this.family = family;
    this.lifeEvent = lifeEvent;
  }


  // getters  setters
  getId(): string {
    return this.id;
  }

  setId(value: string) {
    this.id = value;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getMiddleName(): string {
    return this.middleName;
  }

  getAge(): number {
    return this.age;
  }

  getSex(): "m" | "w" {
    return this.sex;
  }

  getLifeEvent(): Array<LifeEvent> {
    return this.lifeEvent;
  }

  getFamily(): Family {
    return this.family;
  }
}


// test ///
//   console.log(new Person('3', 'John', 'Nech','Jonson', 23, 'm', null, null, new Family(), []))
