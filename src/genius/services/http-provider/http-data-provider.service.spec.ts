import {fakeAsync, TestBed} from '@angular/core/testing';
import {HttpDataProvider} from './http-data-provider.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Person, Sex} from "../../../model/person";
import {Family} from "../../../model/family";

describe('HttpDataProviderService', () => {
  let service: HttpDataProvider;

  let random = (max: number, min: number): number => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpTestingController],
      providers: [HttpDataProvider],
    });
    service = TestBed.inject(HttpDataProvider);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('addNewFamily(); should be created', () => {
  // });

  // it('addNewPerson()',()=>{});
  //
  // it('changeFamily()',()=>{});
  // it('changePerson()',()=>{});
  // it('deleteFamily()',()=>{});
  //
  // it('deletePerson()',()=>{});
  //
  // it('findFamily()',()=>{});
  // it('findPerson()',()=>{});
  //
  // it('getFamilies()', inject([ HttpTestingController], (backend: HttpTestingController) => {
  //   const mockFamily: Family = {id:12};
  //
  //   service.getFamilies().subscribe(families => {
  //     expect(families[0]).toEqual(mockFamily);
  //   })
  //
  //   backend.expectOne()
  // });
  // it('getPersons()',()=>{});

});
