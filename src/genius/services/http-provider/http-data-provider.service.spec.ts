import {TestBed} from '@angular/core/testing';
import {HttpDataProvider} from './http-data-provider.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Person, Sex} from "../../../model/person";
import {environment} from "../../../environments/environment";
import {PersonDTO} from "../dto/dtOs";
import {Family} from "../../../model/family";


describe('HttpDataProviderService', () => {
  let service: HttpDataProvider;
  let backend: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpDataProvider],
    });
    service = TestBed.inject(HttpDataProvider);
    backend = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPersons(); should be GET, should be the same', () => {
    const persons: Array<Person> = [{
      familyId: undefined,
      firstName: "Lola",
      id: 12,
      lastName: undefined,
      middleName: undefined,
      sex: Sex.FEMALE,
    },];

    service.getPersons().subscribe(responsePersons => {
      responsePersons.forEach((person, index) => {
        expect(responsePersons[index].id).toEqual(persons[index].id);
      })
    })

    backend.expectOne({
      method: 'GET',
      url: `${environment.url}/persons`
    }).flush(persons)
    backend.verify();
  })

  it('getFamilies(); should be GET, should be the same', () => {
    const families: Array<Family> = [{
      id: 12,
    },];

    service.getFamilies().subscribe(responseFamilies => {
      console.log(responseFamilies)
      responseFamilies.forEach((family, index) => {
        expect(responseFamilies[index].id).toEqual(families[index].id);
      })
    })

    const test = backend.match({
      method: 'GET',
      url: `${environment.url}/families`
    })

    console.log(test)
    backend.verify();
  })

});

