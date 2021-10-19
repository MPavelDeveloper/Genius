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
      lifeEvent: [
        {
          date: new Date('1989-03-12'),
          type: EventType.wedding,
          description: 'Married',
        },
      ],
      familyId: 2,
    },
    wife: {
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


  // OK
  it('addNewFamily();', () => {
    let newFamily: Family = {
      father:{
        firstName: 'TestF',
        sex: Sex.MALE,
        age:27,
      }
    }
    service.addNewFamily(newFamily).subscribe(null);
    service.getFamilies().subscribe(families => {
      expect(families.includes(newFamily)).toBeTrue();
    })
  });
  it('addNewPerson();', () => {
    let newPerson: Person = {
      firstName: 'John',
      sex: Sex.MALE,
      age: 27,
    }
    service.addNewPerson(newPerson).subscribe(null);
    service.getPersons().subscribe(persons => {
      expect(persons.includes(newPerson)).toBeTrue();
    })
  });


  // OK
  it('changeFamily();', () => {
    let testFamily = service.families[0]
    person.id = 3;
    testFamily.father = person;
    service.changeFamily(testFamily).subscribe(null);
    service.reloadData();
    service.findFamily(testFamily.id).subscribe(targetFamily => {
      expect(targetFamily.father.id).toBe(testFamily.father.id)
    })
  });
  it('changePerson(); should be the same', () => {
    let testPerson = service.persons[0];
    testPerson.firstName = 'Test';
    service.changePerson(testPerson).subscribe(null);
    service.reloadData();
    service.findPerson(testPerson.id).subscribe(targetPerson => {
      expect(targetPerson?.firstName).toBe(testPerson.firstName);
    })

  });

  // OK
  it('deleteFamily();', () => {
    service.deleteFamily(family.id);
    expect(service.families.includes(family)).toBeFalse();
  });
  it('deletePerson(); ', () => {
    service.deletePerson(person.id);
    expect(service.persons.includes(person)).toBeFalse();

  });

  // OK
  it('findFamily(); correct data; should be family', () => {
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData))
    service.reloadData()
    service.findFamily(family.id).subscribe(targetFamily => {
      expect(targetFamily).toBeDefined()
      expect(targetFamily instanceof Family).toBeTrue()
    })
  });
  it('findPerson(); correct data; should be person', () => {
    const testPersonId = 2;
    localStorage.clear()
    localStorage.setItem(GENEALOGY_STORAGE_KEY, JSON.stringify(testData));
    service.reloadData()
    service.findPerson(testPersonId).subscribe(targetPerson => {
      expect(targetPerson.id).toBe(testPersonId)
    })
  });

  // OK
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

  // OK
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
})
