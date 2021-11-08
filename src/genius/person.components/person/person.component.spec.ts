import {ComponentFixture, TestBed} from "@angular/core/testing";
import {PersonComponent, PersonTemplateType} from './person.component';
import {Sex} from '../../../model/person';


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
    component.templateVersion = PersonTemplateType.SHORT;
    component.person = {
      id: 4,
      firstName: 'Nick',
      lastName: 'James',
      middleName: 'Kolin',
      age: 92,
      sex: Sex.MALE,
      // lifeEventType: null,
      familyId: null,
    };
    fixture.detectChanges();
  });

  it('should create the person component', () => {
    expect(component).toBeTruthy();
  });

  it('HTML and Instance; should be the same;', () => {
    let personHTML = fixture.nativeElement.querySelector('.person-short')

    expect(personHTML.textContent).toContain(`${component.person.firstName}  ${component.person.age}`);
  });

  it('HTML and Instance; should be the same; Dynamic changes', () => {
    let personHTML = fixture.nativeElement.querySelector('.person-short')
    component.person.firstName = 'First Name';
    component.person.age = 300;
    fixture.detectChanges();

    expect(personHTML.textContent).toContain(`${component.person.firstName}  ${component.person.age}`);
  })


});
