import {TestBed} from '@angular/core/testing';
import {LocalStorageDataProvider} from './data-provider.service';
import {json, data, key, testData} from "../../json";
import {Person, Sex} from "../../model/person";
import {Events} from "../../model/life-event";


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


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
    localStorage.setItem('json', json)
  });

  // afterEach(() => {
  //   localStorage.setItem('json', json)
  // })


  it('should create the data-provider service', () => {
    expect(service).toBeTruthy()
  })

  // positive tests
  it('findPerson; should be person / family', () => {
    localStorage.clear()
    localStorage.setItem(key, JSON.stringify(testData));

    service.reloadData()
    console.log(service.persons)
    let res = service.findPerson(person.id)
    expect(res).toBeDefined()
  })

  it('findFamily(); should be family')


  // negative test's
  it('findPerson(); fake data; should be undefined', () => {
    let res = service.findPerson('str')
    expect(res).toBeUndefined()
  });

  it('findFamily(); fake data; should be undefined', () => {
    let res = service.findFamily('str');
    expect(res).toBeUndefined();
  });


  // it('data; local storage is empty', () => {
  //   localStorage.clear()
  //   let serv = new LocalStorageDataProvider()
  //   expect(serv.persons).toBeUndefined()
  //   expect(serv.families).toBeUndefined()
  // })


})


// it('persons; check data type', () => {
//   const persons = service.getPersons()
//   expect(Array.isArray(persons)).toBeTrue()
//
//   for (let person of persons) {
//     expect(person instanceof Person).toBeTrue()
//   }
// });
// it('persons; check amount of persons', () => {
//   const serv = new LocalStorageDataProvider()
//   expect(serv.getPersons().length === 9).toBeTrue()
// });


// it('families; check data type', () => {
//   const serv = new LocalStorageDataProvider()
//   const families = service.getFamilies()
//   expect(Array.isArray(families)).toBeTrue()
//
//   for (let family of families) {
//     expect(family instanceof Family).toBeTrue()
//   }
// });


// it('families; check amount of families', () => {
//   const serv = new LocalStorageDataProvider()
//   expect(service.getFamilies().length).toEqual(data.familyList.length)
// });
