import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PersonComponent} from "./person.component";
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
      id: 4,
      firstName: 'Nick',
      lastName: 'James',
      middleName: 'Kolin',
      age: 92,
      sex: Sex.MALE,
      lifeEvent: null,
      familyId: null,
    };
    fixture.detectChanges();
  });

  it('should create the person component', () => {
    expect(component).toBeTruthy();
  });

  it('HTML and Instance; should be the same;', () => {
    let personName = fixture.nativeElement.querySelector('.person-name');
    let personAge = fixture.nativeElement.querySelector('.person-age');

    expect(personName.textContent).toContain(`${component.person.firstName} ${component.person.lastName} ${component.person.middleName}`);
    expect(personAge.textContent).toContain(`${component.person.age} years`);
  });

  it('HTML and Instance; should be the same; Dynamic changes', () => {
    let personName = fixture.nativeElement.querySelector('.person-name');
    let personAge = fixture.nativeElement.querySelector('.person-age');

    component.person.firstName = 'First Name';
    component.person.lastName = 'Last Name';
    component.person.middleName = 'Middle Name';
    component.person.age = 300;
    fixture.detectChanges();

    expect(personName.textContent).toContain(`${component.person.firstName} ${component.person.lastName} ${component.person.middleName}`);
    expect(personAge.textContent).toContain(`${component.person.age} years`);
  })


});
