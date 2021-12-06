import {TestBed} from '@angular/core/testing';
import {TokenInterceptorService} from './token-interceptor.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {DataProvider} from '../data-provider';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';

describe('InterceptorService', () => {
  let service: DataProvider;
  let httpMock: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        {provide: DataProvider, useClass: HttpDataProvider},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true},
      ]
    });
    service = TestBed.inject(DataProvider);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be the same', () => {
    service.setToken('test token');
    service.getPersons().subscribe(persons => {
      expect(persons).toBeTruthy();
    })

    const httpRequest = httpMock.expectOne(`${environment.url}/persons`);
    expect(httpRequest.request.headers.has('authorization')).toBeTrue();
  });
});
