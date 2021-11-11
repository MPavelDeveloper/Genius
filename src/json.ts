import {FamilyEventType, EventPrefix, LifeEventType} from './model/life-event';
import {LineAge} from "./model/line-age";
import {Sex} from "./model/person";
import {generateTokenForLocalStorage} from './genius/utils/utils';

export interface UserDataLocalStorage {
  login: string;
  password: string;
  token: string;
}

export const LINE_AGE_DEFAULT: LineAge = {
  familyList: [{
    id: 1,
    note: '',
    husband: {
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
      lifeEvents:[
        {
          date: new Date('1989-03-12'),
          type: LifeEventType.MARRIED,
          note: 'Married',
        },
      ],
      familyId: 2,
    },
    wife: {
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
      lifeEvents: [
        {
          date: new Date('1989-03-07'),
          type: LifeEventType.MARRIED,
          note: 'Married',
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
      lifeEvents: [
        {
          date: new Date('1998-05-12'),
          type: LifeEventType.MARRIED,
          note: 'Married',
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
      lifeEvents: [
        {
          date: new Date('1992-03-09'),
          type: LifeEventType.MARRIED,
          note: 'Married',
        },
      ],
      familyId: 1,
    }],
    events: [{
      id: 10,
      type:FamilyEventType.BIRTH,
      prefix: EventPrefix.NONE,
      date: new Date('2021-11-03'),
    }],
  }, {
    id: 2,
    note: undefined,
    husband: {
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
      lifeEvents: [],
      familyId: null,
    },
    wife: {
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
      lifeEvents: [],
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
      lifeEvents: [
        {
          date: new Date('1989-03-12'),
          type: LifeEventType.MARRIED,
          note: 'Married',
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
      lifeEvents: [],
      familyId: 2,
    }],
    events: [{
      id: 11,
      type:FamilyEventType.BIRTH,
      prefix: EventPrefix.NONE,
      date: new Date('2021-11-03'),
    }],
  }, {
    id: 3,
    note: undefined,
    husband: {
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
      lifeEvents: [],
      familyId: null,
    },
    wife: {
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
      lifeEvents: [],
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
      lifeEvents: [],
      familyId: 3,
    }],
    events: [{
      id: 12,
      type:FamilyEventType.BIRTH,
      prefix: EventPrefix.NONE,
      date: new Date('2021-11-03'),
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
    lifeEvents: [
      {
        id:1,
        prefix: EventPrefix.NONE,
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
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
    lifeEvents: [
      {
        id:2,
        prefix: EventPrefix.NONE,
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
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
    lifeEvents: [
      {
        id:3,
        prefix: EventPrefix.NONE,
        date: new Date('1998-05-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
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
    lifeEvents: [
      {
        id:4,
        prefix: EventPrefix.NONE,
        date: new Date('1992-03-09'),
        type: LifeEventType.MARRIED,
        note: 'Married',
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
    lifeEvents: [],
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
    lifeEvents: [],
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
    lifeEvents: [],
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
    lifeEvents: [],
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
    lifeEvents: [],
    familyId: null,
  },],
}

export const GENEALOGY_STORAGE_KEY = 'Genealogy/LineAge';

export const JSON_DEFAULT_GENEALOGY_STORAGE = JSON.stringify(LINE_AGE_DEFAULT);

export const USER_REGISTRY_DEFAULT: Array<UserDataLocalStorage> = [
  {
    login: 'test@mail.ru',
    password: '1111',
    token: generateTokenForLocalStorage(),
  }
]

export const JSON_USER_REGISTRY_DEFAULT = JSON.stringify(USER_REGISTRY_DEFAULT);

export const GENEALOGY_USER_REGISTRY_KEY = 'Genealogy/UserRegistry'

export const testData: LineAge = {
  familyList: [{
    id: 1,
    note: undefined,
    husband: {
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
      lifeEvents: [
        {
          date: new Date('1989-03-12'),
          type: LifeEventType.MARRIED,
          note: 'Married',
        },
      ],
      familyId: 2,
    },
    wife: {
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
      lifeEvents: [
        {
          date: new Date('1989-03-12'),
          type: LifeEventType.MARRIED,
          note: 'Married',
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
      lifeEvents: [
        {
          date: new Date('1998-05-12'),
          type: LifeEventType.MARRIED,
          note: 'Married',
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
      lifeEvents: [
        {
          date: new Date('1992-03-09'),
          type: LifeEventType.MARRIED,
          note: 'Married',
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
    lifeEvents: [
      {
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
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
    lifeEvents: [],
    familyId: 2,
  }],
}



