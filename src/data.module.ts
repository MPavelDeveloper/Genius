// import class
import {Family} from "./model/Family";

// import enums
import {Sex} from "./model/Person";
import {Events} from "./model/LifeEvent"


let data: Array<Family> = [{
  father: {
    id: '2p',
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Johnson',
    age: 54,
    sex: Sex.man,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: Events.wedding,
        description: 'Married',
      },
    ],
    // family: [],
  },
  mother: {
    id: '3p',
    firstName: 'Lola',
    lastName: 'James',
    middleName: 'Kolin',
    age: 45,
    sex: Sex.woman,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: Events.wedding,
        description: 'Married',
      },
    ],
    // family: [],
  },
  children: [
    {
      id: '1p',
      firstName: 'John',
      lastName: 'James',
      middleName: 'Johnson',
      age: 23,
      sex: Sex.man,
      lifeEvent: [
        {
          date: new Date('1998-05-12'),
          type: Events.birthDay,
          description: 'Married',
        },
      ],
      // family: [],

    },
  ]
}];

export const json = JSON.stringify(data)
