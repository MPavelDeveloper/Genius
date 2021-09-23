import {TestBed} from '@angular/core/testing';
import {LocalStorageDataProvider} from './data-provider.service';
import {json} from "../../json";
import {Person} from "../../model/person";
import {Family} from "../../model/family";


// connection
describe('LocalStorageDataProvider', () => {
  let service: LocalStorageDataProvider;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);

    localStorage.setItem('json', json)
  });


  it('create instance', () => {
    const serv = new LocalStorageDataProvider()
    expect(serv).toBeTruthy()
  })

  it('persons; check data type', () => {
    const serv = new LocalStorageDataProvider()
    const persons = serv.getPersons()
    expect(Array.isArray(persons)).toBeTrue()

    for (let person of persons) {
      expect(person instanceof Person).toBeTrue()
    }
  });
  it('persons; check amount of persons', () => {
    const serv = new LocalStorageDataProvider()
    expect(serv.getPersons().length === 9).toBeTrue()
  });


  it('families; check data type', () => {
    const serv = new LocalStorageDataProvider()
    const families = serv.getFamilies()
    expect(Array.isArray(families)).toBeTrue()

    for (let family of families) {
      expect(family instanceof Family).toBeTrue()
    }
  });
  it('families; check amount of families', () => {
    const serv = new LocalStorageDataProvider()
    expect(serv.getFamilies().length === 3).toBeTrue()
  });


  it('data; local storage is empty', () => {
    localStorage.clear()
    const serve = new LocalStorageDataProvider()
    expect(serve.persons).toBeUndefined()
    expect(serve.families).toBeUndefined()
  })

  it('findPerson(); check', () => {
    const serve = new LocalStorageDataProvider()

    let res_str = serve.findPerson('str')
    expect(res_str === null || res_str === undefined).toBeTrue()
  });
  it('findFamily(); check', () => {
    const serve = new LocalStorageDataProvider()

    let res_str = serve.findFamily('str');
    expect(res_str === null || res_str === undefined).toBeTrue();
  });

})
