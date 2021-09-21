import {LineAge} from "./model/line-age";
import {Sex} from "./model/person";
import {Events} from "./model/life-event";


const data: LineAge = {
  familyList: [{
    id: '1f',
    father: {
      id: '2p',
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      age: 54,
      sex: Sex.Male,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: Events.wedding,
          description: 'Married',
        },
      ],
      familyId: '2f',
    },
    mother: {
      id: '3p',
      firstName: 'Lola',
      lastName: 'James',
      middleName: 'Kan',
      age: 45,
      sex: Sex.Female,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: Events.wedding,
          description: 'Married',
        },
      ],
      familyId: null,
    },
    children: [{
      // son first
      id: '1p',
      firstName: 'John',
      lastName: 'James',
      middleName: 'Tomson',
      age: 23,
      sex: Sex.Male,
      lifeEvent: [
        {
          date: new Date('1998-05-12'),
          type: Events.birthDay,
          description: 'Married',
        },
      ],
      familyId: '1f',
    }, {
      // son second
      id: '4p',
      firstName: 'Sergey',
      lastName: 'James',
      middleName: 'Tomson',
      age: 29,
      sex: Sex.Male,
      lifeEvent: [
        {
          date: new Date('1992-03-09'),
          type: Events.birthDay,
          description: 'Married',
        },
      ],
      familyId: '1f',
    }],
  }, {
    id: '2f',
    father: {
      id: '4pp',
      firstName: 'Nick',
      lastName: 'James',
      middleName: 'Kolin',
      age: 92,
      sex: Sex.Male,
      lifeEvent: null,
      familyId: null,
    },
    mother: {
      // mother
      id: '5pp',
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      age: 88,
      sex: Sex.Female,
      lifeEvent: null,
      familyId: '3f',
    },
    children: [{
      // first family
      // father
      id: '2p',
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      age: 54,
      sex: Sex.Male,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: Events.wedding,
          description: 'Married',
        },
      ],
      familyId: '2f',
    }, {
      // + child
      id: '3pp',
      firstName: 'Nolan',
      lastName: 'James',
      middleName: 'Nickson',
      age: 58,
      sex: Sex.Male,
      lifeEvent: null,
      familyId: '2f',
    }],
  }, {
    id: '3f',
    father: {
      // third family
      // father
      id: '6ppp',
      firstName: 'Han',
      lastName: 'Long',
      middleName: 'Kan',
      age: 142,
      sex: Sex.Male,
      lifeEvent: null,
      familyId: null,
    },
    mother: {
      // mother
      id: '7ppp',
      firstName: 'Jessica',
      lastName: 'Long',
      middleName: 'Kolin',
      age: 137,
      sex: Sex.Female,
      lifeEvent: null,
      familyId: null,
    },
    children: [{
      // mother
      id: '5pp',
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      age: 88,
      sex: Sex.Female,
      lifeEvent: null,
      familyId: '3f',
    }],
  }, ],

  personList: [{
    // first family
    // father
    id: '2p',
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    age: 54,
    sex: Sex.Male,
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
    sex: Sex.Female,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: Events.wedding,
        description: 'Married',
      },
    ],
    familyId: null,
  }, {
    // son first
    id: '1p',
    firstName: 'John',
    lastName: 'James',
    middleName: 'Tomson',
    age: 23,
    sex: Sex.Male,
    lifeEvent: [
      {
        date: new Date('1998-05-12'),
        type: Events.birthDay,
        description: 'Married',
      },
    ],
    familyId: '1f',
  }, {
    // son second
    id: '4p',
    firstName: 'Sergey',
    lastName: 'James',
    middleName: 'Tomson',
    age: 29,
    sex: Sex.Male,
    lifeEvent: [
      {
        date: new Date('1992-03-09'),
        type: Events.birthDay,
        description: 'Married',
      },
    ],
    familyId: '1f',
  }, {
    // second family
    // father
    id: '4pp',
    firstName: 'Nick',
    lastName: 'James',
    middleName: 'Kolin',
    age: 92,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: '5pp',
    firstName: 'Julia',
    lastName: 'James',
    middleName: 'Han',
    age: 88,
    sex: Sex.Female,
    lifeEvent: null,
    familyId: '3f',
  }, {
    // + child
    id: '3pp',
    firstName: 'Nolan',
    lastName: 'James',
    middleName: 'Nickson',
    age: 58,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: '2f',
  }, {
    // third family
    // father
    id: '6ppp',
    firstName: 'Han',
    lastName: 'Long',
    middleName: 'Kan',
    age: 142,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: '7ppp',
    firstName: 'Jessica',
    lastName: 'Long',
    middleName: 'Kolin',
    age: 137,
    sex: Sex.Female,
    lifeEvent: null,
    familyId: null,
  }, ],
}

export const json = JSON.stringify(data)

