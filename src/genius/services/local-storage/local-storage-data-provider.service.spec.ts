import { TestBed } from '@angular/core/testing';
import { GENEALOGY_STORAGE_KEY, json, testData } from "../../../json";
import { Family } from "../../../model/family";
import { EventType } from "../../../model/life-event";
import { Person, Sex } from "../../../model/person";
import { LocalStorageDataProvider } from './local-storage-data-provider.service';

describe('LocalStorageDataProvider', () => {
  let service: LocalStorageDataProvider
  let person: Person = {
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
  };
  let family: Family = {
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
      id: 3,
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
      id: 1,
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, json)
  });

  afterEach(() => {
    localStorage.setItem(GENEALOGY_STORAGE_KEY, json)
  })

  it('should create the data-provider service', () => {
    expect(service).toBeTruthy();
  });

  it('addNewFamily();', () => {
    service.addNewFamily(family);
  });

  it('addNewPerson();', () => {
    service.addNewPerson(person);
  });

  it('changeFamily();', () => {
  });
  it('changePerson();', () => {
  });

  it('deleteFamily();', () => {
  });
  it('deletePerson();', () => {
  });

  it('findFamily(); correct data; should be family', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData))

    service.reloadData()

    let res = service.findFamily(family.id)
    expect(res).toBeDefined()
    expect(res instanceof Family).toBeTrue()
  });
  it('findPerson(); correct data; should be person', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData));

    service.reloadData()

    let res = service.findPerson(person.id)
    console.log(res)
    expect(res).toBeDefined()
    expect(res instanceof Person).toBeTrue()
  });

  it('getFamilies(); correct data; should be arr of families', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData))

    service.reloadData()

    let res = service.getFamilies()
    expect(res).toBeDefined()
    expect(Array.isArray(res)).toBeTrue()
    res.forEach(family => {
      expect(family instanceof Family).toBeTrue()
    })
  });
  it('getPersons(); correct data; should be arr of persons', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData))

    service.reloadData()

    let res = service.getPersons()
    expect(res).toBeDefined()
    expect(Array.isArray(res)).toBeTrue()
    res.forEach(person => {
      expect(person instanceof Person).toBeTrue()
    })
  });

  it('setPersonsId();', () => {
  });
  it('checkFamilyPerson();', () => {
  });


  // negative test's
  it('findPerson(); fake data; should be undefined', () => {
    let res = service.findPerson(300)
    expect(res).toBeUndefined()
  });

  it('findFamily(); fake data; should be undefined', () => {
    let res = service.findFamily(300);
    expect(res).toBeUndefined();
  });


})
