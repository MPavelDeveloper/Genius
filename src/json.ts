import {LineAge} from "./model/line-age";
import {Sex} from "./model/person";
import {Events} from "./model/life-event";


export const data: LineAge = {
  familyList: [{
    id: 1,
    father: {
      id: 2,
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
      familyId: 2,
    },
    mother: {
      id: 2,
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
      id: 3,
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
      familyId: 1,
    }, {
      // son second
      id: 4,
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
      familyId: 1,
    }],
  }, {
    id: 2,
    father: {
      id: 5,
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
      id: 6,
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      age: 88,
      sex: Sex.Female,
      lifeEvent: null,
      familyId: 3,
    },
    children: [{
      // first family
      // father
      id: 1,
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
      familyId: 2,
    }, {
      // + child
      id: 7,
      firstName: 'Nolan',
      lastName: 'James',
      middleName: 'Nickson',
      age: 58,
      sex: Sex.Male,
      lifeEvent: null,
      familyId: 2,
    }],
  }, {
    id: 3,
    father: {
      // third family
      // father
      id: 8,
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
      id: 9,
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
      id: 6,
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      age: 88,
      sex: Sex.Female,
      lifeEvent: null,
      familyId: 3,
    }],
  }, ],




  personList: [{
    // first family
    // father
    id: 1,
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
    familyId: 2,
  }, {
    // mother
    id: 2,
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
    id: 3,
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
    familyId: 1,
  }, {
    // son second
    id: 4,
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
    familyId: 1,
  }, {
    // second family
    // father
    id: 5,
    firstName: 'Nick',
    lastName: 'James',
    middleName: 'Kolin',
    age: 92,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: 6,
    firstName: 'Julia',
    lastName: 'James',
    middleName: 'Han',
    age: 88,
    sex: Sex.Female,
    lifeEvent: null,
    familyId: 3,
  }, {
    // + child
    id: 7,
    firstName: 'Nolan',
    lastName: 'James',
    middleName: 'Nickson',
    age: 58,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: 2,
  }, {
    // third family
    // father
    id: 8,
    firstName: 'Han',
    lastName: 'Long',
    middleName: 'Kan',
    age: 142,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: 9,
    firstName: 'Jessica',
    lastName: 'Long',
    middleName: 'Kolin',
    age: 137,
    sex: Sex.Female,
    lifeEvent: null,
    familyId: null,
  }, ],
}




export const testData: LineAge = {
  familyList: [{
    id: 1,
    father: {
      id: 2,
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
      familyId: 2,
    },
    mother: {
      id: 2,
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
      id: 3,
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
      familyId: 1,
    }, {
      // son second
      id: 4,
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
      familyId: 1,
    }],
  }, ],
  personList: [{
    // first family
    // father
    id: 1,
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
    familyId: 2,
  },{
    id: 2,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    age: 54,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: 2,
  } ],
}

export const GENEALOGY_STORAGE_KEY = 'Genealogy/LineAge';
export const json = JSON.stringify(data)

