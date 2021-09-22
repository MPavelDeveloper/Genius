import { TestBed } from '@angular/core/testing';
import { LocalStorageDataProvider } from './data-provider.service';



// connection
describe('LocalStorageDataProvider', () => {
  let service: LocalStorageDataProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[LocalStorageDataProvider]
    });
    service = TestBed.inject(LocalStorageDataProvider);
  });



  // test's
  it('create instance', () => {
    const serv = new LocalStorageDataProvider()
    expect(serv).toBeTruthy()
  })

  it('persons; check data type ',  () => {
    const serv = new LocalStorageDataProvider()
          expect(Array.isArray(serv.getPersons())).toBeTrue()
  });

  it('persons; check amount ',  () => {
    const serv = new LocalStorageDataProvider()
    expect(serv.getPersons().length === 9).toBeTrue()
  });

  it('familys; check data type ',  () => {
    const serv = new LocalStorageDataProvider()
    expect(Array.isArray(serv.getFamilies())).toBeTrue()
  });

  it('familys; check amount ',  () => {
    const serv = new LocalStorageDataProvider()
    expect(serv.getFamilies().length === 3).toBeTrue()
  });





});
