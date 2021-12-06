import {FamilyEventType, EventPrefix, LifeEventType} from './model/life-event';
import {LineAge} from './model/line-age';
import {Person, Sex} from './model/person';
import {generateTokenForLocalStorage} from './genius/utils/utils';
import {Family} from './model/family';
import {Node} from './genius/services/family-tree/family-tree.service'

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
      familyId: 1,
      parentFamilyId: 2,
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
      familyId: 1,
      parentFamilyId: 3,
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
      parentFamilyId: 1,
      familyId: null,
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
      parentFamilyId: 1,
      familyId: null,
    }],
    events: [{
      id: 10,
      type: FamilyEventType.BIRTH,
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
      familyId: 2,
      parentFamilyId: null,
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
      familyId: 2,
      parentFamilyId: null,
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
      familyId: 1,
      parentFamilyId: 2,
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
      type: FamilyEventType.BIRTH,
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
      familyId: 3,
      parentFamilyId: null,
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
      familyId: 3,
      parentFamilyId: null,
    },
    children: [{
      id: 2,
      firstName: 'Lola',
      lastName: 'James',
      middleName: 'Han',
      maidenName: undefined,
      age: 88,
      sex: Sex.FEMALE,
      place: undefined,
      note: undefined,
      occupation: undefined,
      lifeEvents: [],
      familyId: 1,
      parentFamilyId: 3,
    }],
    events: [{
      id: 12,
      type: FamilyEventType.BIRTH,
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
        id: 1,
        prefix: EventPrefix.NONE,
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    familyId: 1,
    parentFamilyId: 2,
  }, {
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
        id: 2,
        prefix: EventPrefix.NONE,
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    familyId: 1,
    parentFamilyId: 3,
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
        id: 3,
        prefix: EventPrefix.NONE,
        date: new Date('1998-05-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    parentFamilyId: 1,
    familyId: null,
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
        id: 4,
        prefix: EventPrefix.NONE,
        date: new Date('1992-03-09'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    parentFamilyId: 1,
    familyId: null,
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
    familyId: 2,
    parentFamilyId: null,
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
    familyId: 3,
    parentFamilyId: null,
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
    familyId: 3,
    parentFamilyId: null,
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
    age: 54,
    sex: Sex.MALE,
    place: undefined,
    note: undefined,
    occupation: undefined,
    lifeEvents: [
      {
        id: 1,
        prefix: EventPrefix.NONE,
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    familyId: 1,
    parentFamilyId: 2,
  }, {
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
        id: 2,
        prefix: EventPrefix.NONE,
        date: new Date('1989-03-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    familyId: 1,
    parentFamilyId: 3,
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
        id: 3,
        prefix: EventPrefix.NONE,
        date: new Date('1998-05-12'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    parentFamilyId: 1,
    familyId: null,
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
        id: 4,
        prefix: EventPrefix.NONE,
        date: new Date('1992-03-09'),
        type: LifeEventType.MARRIED,
        note: 'Married',
      },
    ],
    parentFamilyId: 1,
    familyId: null,
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
    familyId: 2,
    parentFamilyId: null,
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
    familyId: 3,
    parentFamilyId: null,
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
    familyId: 3,
    parentFamilyId: null,
  },],
}


export const testDataFamilies: Array<Family> = [{
  id: 1,
  husband: {
    id: 1,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    sex: Sex.MALE,
    familyId: 1,
    parentFamilyId: null,
  },
  wife: {
    id: 2,
    firstName: 'Lola',
    lastName: 'James',
    middleName: 'Kan',
    sex: Sex.FEMALE,
    familyId: 1,
    parentFamilyId: null,
  },
  children: [{
    id: 3,
    firstName: 'John',
    lastName: 'James',
    middleName: 'Tomson',
    sex: Sex.MALE,
    parentFamilyId: 1,
    familyId: 2,
  }],
}, {
  id: 2,
  husband: {
    id: 3,
    firstName: 'John',
    lastName: 'James',
    middleName: 'Tomson',
    sex: Sex.MALE,
    parentFamilyId: 1,
    familyId: 2,
  },
  wife: {
    id: 4,
    firstName: 'Julia',
    lastName: 'James',
    middleName: 'Han',
    sex: Sex.FEMALE,
    parentFamilyId: null,
    familyId: 2,
  },
  children: [],
}];

export const testDataPersons: Array<Person> = [{
  id: 2,
  firstName: 'Lola',
  lastName: 'James',
  middleName: 'Kan',
  sex: Sex.FEMALE,
  familyId: 1,
  parentFamilyId: null,
}, {
  id: 3,
  firstName: 'John',
  lastName: 'James',
  middleName: 'Tomson',
  sex: Sex.MALE,
  parentFamilyId: 1,
  familyId: 2,
}, {
  id: 4,
  firstName: 'Julia',
  lastName: 'James',
  middleName: 'Han',
  sex: Sex.FEMALE,
  parentFamilyId: null,
  familyId: 2,
}, {
  id: 1,
  firstName: 'Tom',
  lastName: 'James',
  middleName: 'Nickson',
  sex: Sex.MALE,
  familyId: 1,
  parentFamilyId: null,
},];

export const testRootFamily: Family = {
  id: 1,
  husband: {
    id: 1,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    sex: Sex.MALE,
    familyId: 1,
    parentFamilyId: null,
  },
  wife: {
    id: 2,
    firstName: 'Lola',
    lastName: 'James',
    middleName: 'Kan',
    sex: Sex.FEMALE,
    familyId: 1,
    parentFamilyId: null,
  },
  children: [{
    id: 3,
    firstName: 'John',
    lastName: 'James',
    middleName: 'Tomson',
    sex: Sex.MALE,
    parentFamilyId: 1,
    familyId: 2,
  }],
}

export const testRootNode: Node = new Node(testDataFamilies[0]);
testRootNode.children.push(new Node(testDataFamilies[1]));

export const testFamilyTreeGridRow: Array<Array<Node>> = [testDataFamilies.map(family => new Node(family))];



