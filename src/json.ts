import {LineAge} from "./model/LineAge";
import {Sex} from "./model/Person";
import {Events} from "./model/LifeEvent";


const data: LineAge = {
  familyList: [{
    id: '1f',
    father: '2p',
    mother: '3p',
    children: ['1p'],
  }, {
    id: '2f',
    father: '4pp',
    mother: '5pp',
    children: ['2p', '3pp'],
  }, ],
  personList: [{
    // first family
    // father
    id: '2p',
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    age: 54,
    sex: Sex.man,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: Events.wedding,
        description: 'Married',
      },
    ],
    familyId: '2f',
  }, {
    // mother
    id: '3p',
    firstName: 'Lola',
    lastName: 'James',
    middleName: 'Kan',
    age: 45,
    sex: Sex.woman,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: Events.wedding,
        description: 'Married',
      },
    ],
    familyId: null,
  }, {
    // son
    id: '1p',
    firstName: 'John',
    lastName: 'James',
    middleName: 'Tomson',
    age: 23,
    sex: Sex.man,
    lifeEvent: [
      {
        date: new Date('1998-05-12'),
        type: Events.birthDay,
        description: 'Married',
      },
    ],
    familyId: '1f',
  }, {
    // second family
    // father
    id: '2pp',
    firstName: 'Nick',
    lastName: 'James',
    middleName: 'Kolin',
    age: 92,
    sex: Sex.man,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: '3pp',
    firstName: 'Julia',
    lastName: 'James',
    middleName: 'Han',
    age: 88,
    sex: Sex.woman,
    lifeEvent: null,
    familyId: null,
  }, {
    // + child
    id: '3pp',
    firstName: 'Nolan',
    lastName: 'James',
    middleName: 'Nickson',
    age: 92,
    sex: Sex.man,
    lifeEvent: null,
    familyId: '1f',
  }, ],
}

export const json = JSON.stringify(data)

