import {Family} from "./Family";

class Person{

  // props
  id:string;
  name:string;
  age:number;
  sex: 'm' | 'w';
  lifeEvent:Array<Object>;
  dateBirth:'string';
  dateDeath:'string';
  family:Family;

  // const
  constructor(id:string, name:string, age:number, sex:'m' | 'w', dateBirth:'string', dateDeath:'string', family:Family, lifeEvent :Array<Object>) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.dateBirth = dateBirth;
    this.dateDeath = dateDeath;
    this.family = family;
    this.lifeEvent = lifeEvent;
  }
}
