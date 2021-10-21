import {TestBed} from '@angular/core/testing';
import {HttpDataProvider} from './http-data-provider.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from "../../../environments/environment";
import {FamilyDTO, PersonDTO} from "../dto/dtOs";
import {HttpErrorResponse} from "@angular/common/http";

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
    const persons: Array<PersonDTO> = [{
      id: 21,
      name: {
        first: "Lola",
      },
      gender: 'FEMALE',
    },];

    service.getPersons().subscribe(responsePersons => {
      responsePersons.forEach((person, index) => {
        expect(responsePersons[index].id).toEqual(persons[index].id);
        expect(responsePersons[index].firstName).toBe(persons[index].name?.first);
        expect(responsePersons[index].sex).toBe(persons[index].gender?.toLowerCase())
      })
    })

    backend.expectOne({
      method: 'GET',
      url: `${environment.url}/persons`
    }).flush(persons)
    backend.verify();
  })

  it('getPersons(); should be Error 400', () => {
    const errMessage = 'Bad Request';

    service.getPersons().subscribe(() => fail('should fail with the 400 error'),
      (err: HttpErrorResponse) => {
        expect(err.status).toBe(400, 'status');
        expect(err.error).toBe(errMessage, 'message');
      })

    backend.expectOne(`${environment.url}/persons`).flush(errMessage, {
      status: 400,
      statusText: 'Test',
    })
    backend.verify();

  })

  it('getFamilies(); should be GET, should be the same', () => {
    const families: Array<FamilyDTO> = [{
      id: 14,
      husband: 12,
    }];

    const persons: Array<PersonDTO> = [{
      id: 12,
      name: {
        first: 'John',
      },
      gender: 'MALE',
      familyId: 14,
    },];

    service.getFamilies().subscribe(responseFamilies => {
      responseFamilies.forEach((family, index) => {
        expect(responseFamilies[index].id).toBe(families[index].id);
        expect(responseFamilies[index].husband?.id).toBe(families[index].husband);
      })
    })

    backend.expectOne({
      method: 'GET',
      url: `${environment.url}/persons`
    }).flush(persons)

    backend.expectOne({
      method: 'GET',
      url: `${environment.url}/families`
    }).flush(families)
    backend.verify()
  })

  it('getFamilies(); should be error 400', () => {
    const persons: Array<PersonDTO> = [{
      id: 12,
      name: {
        first: 'John',
      },
      gender: 'MALE',
      familyId: 14,
    },];
    const errMessage = 'Bad Request';

    service.getFamilies().subscribe(() => fail('should fail with the 400 error'),
      (err:HttpErrorResponse) => {
        expect(err.status).toBe(400, 'status');
        expect(err.error).toBe(errMessage, 'message');
      })

    backend.expectOne(`${environment.url}/persons`).flush(persons)
    backend.expectOne(`${environment.url}/families`).flush(errMessage, {
      status: 400,
      statusText: 'Test',
    })
    backend.verify();

  })

});

