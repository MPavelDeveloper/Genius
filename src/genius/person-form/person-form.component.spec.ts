// import {ComponentFixture, TestBed} from '@angular/core/testing';
//
// import {PersonFormComponent} from './person-form.component';
// import {FormsModule} from "@angular/forms";
// import {Sex} from "../../model/person";
// import {FormType} from "../family-form/family-form.component";
// import {LocalStorageDataProvider} from "../services/local-storage/local-storage-data-provider.service";
// import {DataProvider} from "../services/data-provider";
//
// describe('PersonFormComponent', () => {
//   let component: PersonFormComponent;
//   let fixture: ComponentFixture<PersonFormComponent>;
//
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PersonFormComponent],
//       imports: [FormsModule],
//       providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
//     })
//       .compileComponents();
//
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(PersonFormComponent);
//     component = fixture.componentInstance;
//     component.person = {
//       id: 2,
//       firstName: 'Tom',
//       lastName: 'James',
//       middleName: 'Nickson',
//       age: 54,
//       sex: Sex.Male,
//       lifeEvent: null,
//       familyId: 2,
//     }
//     component.personType = FormType.CHILD;
//     fixture.detectChanges();
//   });
//
//
//   it('should create', () => {
//     expect(component).toBeTruthy()
//   });
//
//   it('template; render person data, ngModel check; should be the same', () => {
//     const inputFirstName = fixture.nativeElement.querySelector('.person-fn');
//     const inputLastName = fixture.nativeElement.querySelector('.person-ln');
//     const inputMiddleName = fixture.nativeElement.querySelector('.person-mn');
//     const inputAge = fixture.nativeElement.querySelector('.person-age');
//     const inputSex = fixture.nativeElement.querySelector('.person-sexlist');
//
//     const title = fixture.nativeElement.querySelector('.person-title');
//
//     expect(inputFirstName.getAttribute('ng-reflect-model')).toEqual(component.person.firstName)
//     expect(inputLastName.getAttribute('ng-reflect-model')).toEqual(component.person.lastName)
//     expect(inputMiddleName.getAttribute('ng-reflect-model')).toEqual(component.person.middleName)
//     expect(Number(inputAge.getAttribute('ng-reflect-model'))).toEqual(component.person.age)
//     expect(inputSex.getAttribute('ng-reflect-model')).toEqual(component.person.sex)
//
//     expect(title.textContent).toEqual(`Create ${component.personType}`);
//   })
//
//   it('template; generation event; should send event with person || null', () => {
//     const event = spyOn(component.addedPerson, 'emit');
//     component.close();
//
//     expect(event).toHaveBeenCalled()
//     expect(event).toHaveBeenCalledWith(null)
//
//     component.addNewPerson()
//     expect(event).toHaveBeenCalled()
//   })
//
//
// });
