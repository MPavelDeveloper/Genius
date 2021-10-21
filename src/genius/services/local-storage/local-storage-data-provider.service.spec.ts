import {TestBed} from '@angular/core/testing';
import {GENEALOGY_STORAGE_KEY, json, testData} from "../../../json";
import {Family} from "../../../model/family";
import {Person, Sex} from "../../../model/person";
import {LocalStorageDataProvider} from './local-storage-data-provider.service';


describe('LocalStorageDataProvider', () => {
  let service: LocalStorageDataProvider;

  let random = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem(GENEALOGY_STORAGE_KEY, json);
    service.reloadData()
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
})
