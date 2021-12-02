import {TestBed} from '@angular/core/testing';
import {
  GENEALOGY_STORAGE_KEY,
  GENEALOGY_USER_REGISTRY_KEY,
  JSON_DEFAULT_GENEALOGY_STORAGE, JSON_USER_REGISTRY_DEFAULT,
  testData,
} from '../../../json';
import {Family} from '../../../model/family';
import {Person, Sex} from '../../../model/person';
import {LocalStorageDataProvider} from './local-storage-data-provider.service';
import {random} from '../../utils/utils';
import {EventPrefix, FamilyEventType, LifeEvent, LifeEventType} from '../../../model/life-event';
import {LineAge} from '../../../model/line-age';
import {UserLoginData, UserRegistryData} from '../../user-login/user-login.component';


describe('LocalStorageDataProvider', () => {
  let service: LocalStorageDataProvider;
  let testFamily: Family;
  let testPersons: Array<Person>;
  let testPersonEvent: LifeEvent;
  let testFamilyEvent: LifeEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON_DEFAULT_GENEALOGY_STORAGE);
    testFamily = {
      id: 1,
      note: '',
      husband: {
        id: 1,
        firstName: 'Tom',
        lastName: 'James',
        middleName: 'Nickson',
        age: 54,
        sex: Sex.MALE,
        lifeEvents: [],
        familyId: 1,
        parentFamilyId: 2,
      },
      wife: {
        id: 2,
        firstName: 'Lola',
        lastName: 'James',
        middleName: 'Kan',
        age: 45,
        sex: Sex.FEMALE,
        lifeEvents: [],
        familyId: 1,
        parentFamilyId: 3,
      },
      children: [],
      events: []
    };
    testPersons = [{
      id: 1,
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      age: 54,
      sex: Sex.MALE,
      lifeEvents: [],
      familyId: 1,
      parentFamilyId: 2,
    }, {
      id: 2,
      firstName: 'Lola',
      lastName: 'James',
      middleName: 'Kan',
      age: 45,
      sex: Sex.FEMALE,
      lifeEvents: [],
      familyId: 1,
      parentFamilyId: 3,
    }];
    testPersonEvent = {
      id: 5,
      type: LifeEventType.BIRTH,
      date: new Date('2021-12-22'),
    };
    testFamilyEvent = {
      id: 10,
      type: FamilyEventType.BIRTH,
      prefix: EventPrefix.NONE,
      date: new Date('2021-11-03'),
    };
    service.reloadData();
  });

  it('should create the data-provider service', () => {
    expect(service).toBeTruthy();
  });

  it('addNewFamily();', () => {
    let newFamily: Family = {
      husband: {
        firstName: 'TestF',
        sex: Sex.MALE,
        age: 27,
      }
    }
    service.addNewFamily(newFamily).subscribe(null);
    service.reloadData();
    const targetFamily = service.families.find(family => family.id === newFamily.id);
    expect(targetFamily.id).toBe(newFamily.id);
  });

  it('addNewPerson();', () => {
    let newPerson: Person = {
      firstName: 'John',
      sex: Sex.MALE,
      age: 27,
    }
    service.addNewPerson(newPerson).subscribe(null);
    service.reloadData();
    const targetPerson = service.persons.find(person => person.id = newPerson.id);
    expect(targetPerson.id).toBe(newPerson.id);
  });

  it('changeFamily();', () => {
    const changedFamily = service.families[0];
    changedFamily.husband = {id: 1, firstName: 'John', age: 27, sex: Sex.MALE,};
    service.changeFamily(changedFamily).subscribe(null);
    service.reloadData();
    let targetFamily = service.families.find((family: Family) => family.id === changedFamily.id);
    expect(targetFamily).toBeDefined();
    expect(targetFamily.id).toBe(changedFamily.id);
    expect(targetFamily.husband.firstName).toBe(changedFamily.husband.firstName);
  })

  it('changePerson(); should be the same', () => {
    let testPerson = service.persons[0];
    testPerson.firstName = 'Test';
    service.changePerson(testPerson).subscribe(null);
    service.reloadData();
    let targetPerson = service.persons.find((person: Person) => person.id === testPerson.id);
    expect(targetPerson?.firstName).toBe(testPerson.firstName);
  });

  it('deleteFamily();', () => {
    localStorage.clear();
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData));
    service.reloadData();

    const ids = service.families.map(family => family.id);
    const testFamilyId = ids[random(ids.length - 1, 0)]
    service.deleteFamily(testFamilyId);
    let findFamily = service.families.find(family => family.id === testFamilyId)
    expect(findFamily).toBeUndefined();
  });

  it('deletePerson(); ', () => {
    localStorage.clear();
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData));
    service.reloadData();

    const ids = service.persons.map(person => person.id);
    const testPersonId = ids[random(ids.length - 1, 0)]
    service.deletePerson(testPersonId);
    let findPerson = service.persons.find(person => person.id === testPersonId)
    expect(findPerson).toBeUndefined();
  });

  it('findFamily(); correct data; should be family', () => {
    localStorage.clear();
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData));
    service.reloadData();
    const ids: Array<number> = service.families.map(family => family.id);
    const testFamilyId = ids[random(ids.length - 1, 0)];
    service.findFamily(testFamilyId).subscribe(targetFamily => {
      expect(targetFamily.id).toBe(testFamilyId)
    })
  });

  it('findPerson(); correct data; should be person', () => {
    localStorage.clear();
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData));
    service.reloadData();
    const ids: Array<number> = service.persons.map((person) => person.id);
    const testPersonId = ids[random(ids.length - 1, 0)];
    service.findPerson(testPersonId).subscribe(targetPerson => {
      expect(targetPerson.id).toBe(testPersonId);
    })
  });

  it('getFamilies(); correct data; should be arr of families', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData))
    service.reloadData()

    service.getFamilies().subscribe(families => {
      expect(families).toBeDefined()
      expect(Array.isArray(families)).toBeTrue()
      families.forEach(family => {
        expect(family instanceof Family).toBeTrue()
      })
    })
  });

  it('getPersons(); correct data; should be arr of persons', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData))
    service.reloadData()

    service.getPersons().subscribe(persons => {
      expect(persons).toBeDefined()
      expect(Array.isArray(persons)).toBeTrue()
      persons.forEach(person => {
        expect(person instanceof Person).toBeTrue()
      })
    })
  });

  it('findPerson(); fake data; should be undefined', () => {
    service.findPerson(300).subscribe(person => {
      expect(person).toBeUndefined()
    })

  });

  it('findFamily(); fake data; should be undefined', () => {
    service.findFamily(300).subscribe(family => {
      expect(family).toBeUndefined();
    })
  });

  it('should be the same, putData()', () => {
    let testLineAge: LineAge = new LineAge([testFamily], testPersons);
    service.families = [testFamily];
    service.persons = testPersons;

    service.putData();
    let dataInLocalStorage = <LineAge>JSON.parse(localStorage.getItem(GENEALOGY_STORAGE_KEY));
    let lineAge = new LineAge(dataInLocalStorage.familyList, dataInLocalStorage.personList);
    console.log(dataInLocalStorage);
    console.log(testLineAge);
    expect(lineAge).toEqual(testLineAge);
  });

  it('should be the same, addNewPersonEvent()', () => {
    let randomPerson = testPersons[random(testPersons.length - 1, 0)];
    service.persons = testPersons;
    service.families = [testFamily];
    service.addNewPersonEvent(randomPerson.id, testPersonEvent);
    expect(randomPerson.lifeEvents[0]).toEqual(testPersonEvent);
  })

  it('should be deleted, deletePersonEvent()', () => {
    let randomPerson = testPersons[random(testPersons.length - 1, 0)];
    randomPerson.lifeEvents.push(testPersonEvent);
    service.persons = testPersons;
    service.families = [testFamily];
    service.deletePersonEvent(randomPerson.id, testPersonEvent);
    expect(randomPerson.lifeEvents.length).toBe(0);

  });

  it('should be the same, changePersonEvent()', () => {
    let randomPerson = testPersons[random(testPersons.length - 1, 0)];
    randomPerson.lifeEvents.push(testPersonEvent);
    service.persons = testPersons;
    service.families = [testFamily];
    service.changePersonEvent(randomPerson.id, testPersonEvent);
    let data = JSON.parse(localStorage.getItem(GENEALOGY_STORAGE_KEY));
    let targetPerson: Person = data.personList.find((person: Person) => person.id === randomPerson.id);
    targetPerson.lifeEvents.forEach(lifeEvent => lifeEvent.date = new Date(lifeEvent.date));
    expect(targetPerson.lifeEvents).toEqual(randomPerson.lifeEvents);
  });

  it('should be the same, addNewFamilyEvent()', () => {
    service.families = [testFamily];
    service.events = [{id: 21}, {id: 12}, {id: 18}];
    service.addNewFamilyEvent(testFamily.id, testFamilyEvent);
    console.log(testFamily.events);
    expect(testFamily.events).toEqual([testFamilyEvent]);
  });

  it('should be the same, changeFamilyEvent()', () => {
    testFamily.events.push({id: 10});
    service.families = [testFamily];
    service.changeFamilyEvent(testFamily.id, testFamilyEvent);
    expect(testFamily.events).toEqual([testFamilyEvent])
  });

  it('should be the same, deleteFamilyEvent()', () => {
    testFamily.events.push(testFamilyEvent);
    service.families = [testFamily];
    service.deleteFamilyEvent(testFamily.id, testFamilyEvent);
    expect(testFamily.events.length).toBe(0)
  });

  it('should be the same, setToken(), getToken()', () => {
    service.setToken('test string');
    expect(service.getToken()).toBe('test string')
  });

  it('should be define, loginUser()', () => {
    localStorage.setItem(GENEALOGY_USER_REGISTRY_KEY, JSON_USER_REGISTRY_DEFAULT);
    let testData: UserLoginData = {
      username: 'test@mail.ru',
      password: '1111',
    }
    service.loginUser(testData).subscribe(token => {
      expect(token).toBeTruthy();
    });
  });

  it('should be define, registerUser()', () => {
    localStorage.setItem(GENEALOGY_USER_REGISTRY_KEY, JSON_USER_REGISTRY_DEFAULT);
    let registryUser: UserRegistryData = {
      email: 'newUser@mail.ru',
      password: '1111',
    };
    let loginUser: UserLoginData = {
      username: 'newUser@mail.ru',
      password: '1111',
    }
    service.registerUser(registryUser);
    service.loginUser(loginUser).subscribe(token => {
      expect(token).toBeTruthy();
    });
  });

})
