import {TestBed} from '@angular/core/testing';
import {LocalStorageDataProvider} from './data-provider.service';
import {json, key, testData} from "../../json";
import {Person, Sex} from "../../model/person";
import {Events} from "../../model/life-event";
import {Family} from "../../model/family";


describe('LocalStorageDataProvider', () => {
  let service: LocalStorageDataProvider
  let person: Person = {
    id: '2p',
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    age: 54,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: '2f',
  }
  let family: Family = {
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
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem(key, json)
  });
  afterEach(() => {
    localStorage.setItem(key, json)
  })


  it('should create the data-provider service', () => {
    expect(service).toBeTruthy()
  })

  // positive tests
  it('findPerson(); correct data; should be person', () => {
    localStorage.clear()
    localStorage.setItem(key, JSON.stringify(testData));

    service.reloadData()

    let res = service.findPerson(person.id)
    expect(res).toBeDefined()
    expect(res instanceof Person).toBeTrue()
  })

  it('findFamily(); correct data; should be family', () => {
    localStorage.clear()
    localStorage.setItem(key, JSON.stringify(testData))

    service.reloadData()

    let res = service.findFamily(family.id)
    expect(res).toBeDefined()
    expect(res instanceof Family).toBeTrue()
  })

  it('getPersons(); correct data; should be arr of persons', () => {
    localStorage.clear()
    localStorage.setItem(key, JSON.stringify(testData))

    service.reloadData()

    let res = service.getPersons()
    expect(res).toBeDefined()
    expect(Array.isArray(res)).toBeTrue()
    res.forEach(person => {
      expect(person instanceof Person).toBeTrue()
    })
  })

  it('getFamilies(); correct data; should be arr of families', () => {
    localStorage.clear()
    localStorage.setItem(key, JSON.stringify(testData))

    service.reloadData()

    let res = service.getFamilies()
    expect(res).toBeDefined()
    expect(Array.isArray(res)).toBeTrue()
    res.forEach(family => {
      expect(family instanceof Family).toBeTrue()
    })
  })

  it('mapPerson(); correct data; should be instance Person', () => {
    let res = service.mapPerson(person)
    expect(res instanceof Person).toBeTrue()
  })

  it('mapPerson(); correct data; should be instance Person', () => {
    let res = service.mapFamily(person)
    expect(res instanceof Family).toBeTrue()
  })


  // negative test's
  it('findPerson(); fake data; should be undefined', () => {
    let res = service.findPerson('str')
    expect(res).toBeUndefined()
  });

  it('findFamily(); fake data; should be undefined', () => {
    let res = service.findFamily('str');
    expect(res).toBeUndefined();
  });


})
