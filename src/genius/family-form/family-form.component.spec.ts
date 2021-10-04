import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FamilyFormComponent, FormType} from './family-form.component';
import {DataProvider, LocalStorageDataProvider} from "../services/data-provider.service";
import {Person, Sex} from "../../model/person";
import {RouterTestingModule} from "@angular/router/testing";
import {cleanPackageJson} from "@angular/compiler-cli/ngcc/src/packages/build_marker";


describe('FamilyFormComponent', () => {
  let component: FamilyFormComponent;
  let fixture: ComponentFixture<FamilyFormComponent>;
  let testMother: Person = {
    id: null,
    firstName: 'Lola',
    lastName: 'James',
    middleName: 'Kan',
    age: 45,
    sex: Sex.Female,
    lifeEvent: null,
    familyId: null,
  };
  let testFather: Person = {
    id: null,
    firstName: 'Tom',
    lastName: 'James',
    middleName: 'Nickson',
    age: 54,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: null,
  };
  let testChild: Person = {
    id: null,
    firstName: 'John',
    lastName: 'James',
    middleName: 'Tomson',
    age: 23,
    sex: Sex.Male,
    lifeEvent: null,
    familyId: null,
  }


  const fakeDataProvider = jasmine.createSpyObj('fakeDataProvider', ['start']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FamilyFormComponent],
      providers: [{provide: DataProvider, useValue: new LocalStorageDataProvider()}],
    })
      .compileComponents();


  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyFormComponent);
    component = fixture.componentInstance;
    component.setFather(testFather);
    component.setMother(testMother);
    component.setChild(testChild)
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('template; event click; handler: createNewPerson(); should be set personDialogVisible and personType', () => {
    const buttonAdd = fixture.nativeElement.querySelector('.action-btn');
    buttonAdd.click()

    expect(component.personType).toBe(FormType.FATHER)
    expect(component.personDialogVisible).toBeTrue()
  });

  it('template; event click; handler: changePerson(); should be set currentPerson and call createNewPerson()', () => {
    const buttonChange = fixture.nativeElement.querySelector('.change');
    buttonChange.click();

    expect(component.currentPerson.firstName).toBe(component.getFather().firstName);
    expect(component.personType).toBe(FormType.FATHER)
    expect(component.personDialogVisible).toBeTrue()
  });

  it('template; event click; handler: deletePerson(); should be null', () => {
    const buttonDelete = fixture.nativeElement.querySelector('.delete');
    buttonDelete.click();

    expect(component.getFather()).toBeNull()
  });

  it('script; method addPersonsToCollection(); should be create collection of persons', () => {
    let indeticalObjects: boolean = true;
    let arr: Array<Person> = [component.getFather(), component.getMother(),];
    component.getChildren().forEach(child => arr.push(child));

    component.addPersonsToCollection();
    expect(component.persons.length).toBe(arr.length);
    for (let person of component.persons) {
      if (arr.includes(person)) continue;
      indeticalObjects = false;
      break;
    }

    expect(indeticalObjects).toBeTrue();


  });

  it('script; method familyValid(); should be true', () => {
    expect(component.familyValid(component.family)).toBeTrue();
  });

  it('script; method addPersonInFamily(); should be like data', () => {
    const testPerson: Person = {
      id: null,
      firstName: 'Julia',
      lastName: 'James',
      middleName: 'Han',
      age: 88,
      sex: Sex.Female,
      lifeEvent: null,
      familyId: null,
    };
    component.personType = FormType.MOTHER;
    component.addPersonInFamily(testPerson);

    expect(component.family.mother).toBe(testPerson);
  });

  it('script; getters / setters', () => {
    expect(component.getMother()).toBe(testMother);
    expect(component.getFather()).toBe(testFather);
    expect(component.getChildren().includes(testChild)).toBeTrue();
  })
});
