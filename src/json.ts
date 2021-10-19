import { EventType } from "./model/life-event";
import { LineAge } from "./model/line-age";
import { Person, Sex } from "./model/person";


export const data: LineAge = {
  familyList: [{
    id: 1,
    note: undefined,
    father: {
      id: 2,
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      maidenName: undefined,
      age: 54,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: EventType.wedding,
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
      maidenName: undefined,
      age: 45,
      sex: Sex.FEMALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: EventType.wedding,
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
      maidenName: undefined,
      age: 23,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1998-05-12'),
          type: EventType.birthDay,
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
      maidenName: undefined,
      age: 29,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1992-03-09'),
          type: EventType.birthDay,
          description: 'Married',
        },
      ],
      familyId: 1,
    }],
  }, {
    id: 2,
    note: undefined,
    father: {
      id: 5,
      firstName: 'Nick',
      lastName: 'James',
      middleName: 'Kolin',
      maidenName: undefined,
      age: 92,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: null,
      familyId: null,
    },
    mother: {
      // mother
      id: 6,
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      maidenName: undefined,
      age: 88,
      sex: Sex.FEMALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
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
      maidenName: undefined,
      age: 54,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: EventType.wedding,
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
      maidenName: undefined,
      age: 58,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: null,
      familyId: 2,
    }],
  }, {
    id: 3,
    note: undefined,
    father: {
      // third family
      // father
      id: 8,
      firstName: 'Han',
      lastName: 'Long',
      middleName: 'Kan',
      maidenName: undefined,
      age: 142,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: null,
      familyId: null,
    },
    mother: {
      // mother
      id: 9,
      firstName: 'Jessica',
      lastName: 'Long',
      middleName: 'Kolin',
      maidenName: undefined,
      age: 137,
      sex: Sex.FEMALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: null,
      familyId: null,
    },
    children: [{
      // mother
      id: 6,
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      maidenName: undefined,
      age: 88,
      sex: Sex.FEMALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: null,
      familyId: 3,
    }],
  },],
  personList: [{
    // first family
    // father
    id: 1,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    maidenName: undefined,
    age: 54,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: EventType.wedding,
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
    maidenName: undefined,
    age: 45,
    sex: Sex.FEMALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: EventType.wedding,
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
    maidenName: undefined,
    age: 23,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: [
      {
        date: new Date('1998-05-12'),
        type: EventType.birthDay,
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
    maidenName: undefined,
    age: 29,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: [
      {
        date: new Date('1992-03-09'),
        type: EventType.birthDay,
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
    maidenName: undefined,
    age: 92,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: 6,
    firstName: 'Julia',
    lastName: 'James',
    middleName: 'Han',
    maidenName: undefined,
    age: 88,
    sex: Sex.FEMALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: null,
    familyId: 3,
  }, {
    // + child
    id: 7,
    firstName: 'Nolan',
    lastName: 'James',
    middleName: 'Nickson',
    maidenName: undefined,
    age: 58,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: null,
    familyId: 2,
  }, {
    // third family
    // father
    id: 8,
    firstName: 'Han',
    lastName: 'Long',
    middleName: 'Kan',
    maidenName: undefined,
    age: 142,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: null,
    familyId: null,
  }, {
    // mother
    id: 9,
    firstName: 'Jessica',
    lastName: 'Long',
    middleName: 'Kolin',
    maidenName: undefined,
    age: 137,
    place: undefined,
    note: undefined,
    occupation: undefined,
    sex: Sex.FEMALE,
    lifeEvent: null,
    familyId: null,
  },],
}


export const testData: LineAge = {
  familyList: [{
    id: 1,
    note: undefined,
    father: {
      id: 2,
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      maidenName: undefined,
      age: 54,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: EventType.wedding,
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
      maidenName: undefined,
      age: 45,
      sex: Sex.FEMALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: EventType.wedding,
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
      maidenName: undefined,
      age: 23,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1998-05-12'),
          type: EventType.birthDay,
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
      maidenName: undefined,
      age: 29,
      sex: Sex.MALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvent: [
        {
          date: new Date('1992-03-09'),
          type: EventType.birthDay,
          description: 'Married',
        },
      ],
      familyId: 1,
    }],
  },],
  personList: [{
    // first family
    // father
    id: 1,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    maidenName: undefined,
    place: undefined,
    note: undefined,
    occupation: undefined,
    age: 54,
    sex: Sex.MALE,
    lifeEvent: [
      {
        date: new Date('1989-03-12'),
        type: EventType.wedding,
        description: 'Married',
      },
    ],
    familyId: 2,
  }, {
    id: 2,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    maidenName: undefined,
    age: 54,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvent: null,
    familyId: 2,
  }],
}

export const testPerson: Person = {
  id: 1,
  firstName: 'John',
  lastName: 'James',
  middleName: 'Nickson',
  maidenName: undefined,
  age: 54,
  sex: Sex.MALE,
  place: undefined,
  note: undefined,
  occupation: undefined,
  lifeEvent: [
    {
      date: new Date('1989-03-12'),
      type: EventType.wedding,
      description: 'Married',
    },
  ],
  familyId: 2,
}

export const testFamily = {
  father: 6,
  mother: 5,
}

export const GENEALOGY_STORAGE_KEY = 'Genealogy/LineAge';
export const json = JSON.stringify(data)

