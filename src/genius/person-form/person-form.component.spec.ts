import {ComponentFixture, TestBed} from '@angular/core/testing';

import {formStatesEnum, PersonFormComponent} from './person-form.component';
import {FormsModule} from "@angular/forms";
import {Sex} from "../../model/person";
import {PersonTypesEnum} from "../family-form/family-form.component";

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonFormComponent],
      imports: [FormsModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    component.person = {
      id: '2p',
      firstName: 'Tom',
      lastName: 'James',
      middleName: 'Nickson',
      age: 54,
      sex: Sex.Male,
      lifeEvent: null,
      familyId: '2f',
    }
    component.personType = PersonTypesEnum.child;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('template; render person data, ngModel check; should be the same', () => {
    const inputFirstName = fixture.nativeElement.querySelector('.person-fn');
    const inputLastName = fixture.nativeElement.querySelector('.person-ln');
    const inputMiddleName = fixture.nativeElement.querySelector('.person-mn');
    const inputAge = fixture.nativeElement.querySelector('.person-age');
    const inputSex = fixture.nativeElement.querySelector('.person-sexlist');

    const title = fixture.nativeElement.querySelector('.person-title');

    expect(inputFirstName.getAttribute('ng-reflect-model')).toEqual(component.person.firstName)
    expect(inputLastName.getAttribute('ng-reflect-model')).toEqual(component.person.lastName)
    expect(inputMiddleName.getAttribute('ng-reflect-model')).toEqual(component.person.middleName)
    expect(Number(inputAge.getAttribute('ng-reflect-model'))).toEqual(component.person.age)
    expect(inputSex.getAttribute('ng-reflect-model')).toEqual(component.person.sex)

    expect(title.textContent).toEqual(`Create ${component.personType}`);
  })

  it('template; generation event; should send event with person || null', () => {
    const event = spyOn(component.transferPerson, 'emit');
    component.submit(formStatesEnum.closeWindow);

    expect(event).toHaveBeenCalled()
    expect(event).toHaveBeenCalledWith(null)

    component.submit(formStatesEnum.sendPerson)
    expect(event).toHaveBeenCalled()
    expect(event).toHaveBeenCalledWith(component.person)
  })


});
