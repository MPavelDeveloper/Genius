import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonComponent} from './person.component';

import {Sex} from "../../model/person";


describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PersonComponent
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = {
      id: '4pp',
      firstName: 'Nick',
      lastName: 'James',
      middleName: 'Kolin',
      age: 92,
      sex: Sex.Male,
      lifeEvent: null,
      familyId: null,
    }
    fixture.detectChanges();
  });

  it('should create the person component', () => {
    expect(component).toBeTruthy();
  });
});
