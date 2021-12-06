import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonsPageComponent} from './persons-page.component';
import {DataProvider} from '../../services/data-provider';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, Subject} from 'rxjs';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {testDataPersons} from '../../../json';
import {ChangeDetectorRef, NO_ERRORS_SCHEMA} from '@angular/core';
import {Person, Sex} from '../../../model/person';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';

describe('HomePageComponent', () => {
  let component: PersonsPageComponent;
  let fixture: ComponentFixture<PersonsPageComponent>;
  let testPerson: Person;
  const dataProviderMock = {
    getPersons() {
      return new Observable(subscriber => subscriber.next(testDataPersons));
    },
    deletePerson(personId: number) {
      return new Observable(subscriber => subscriber.next(true));
    },
  }
  const dataLoadServiceMock = {
    persons$: new Subject(),
  }
  const changeDetectorMock = {
    detectChanges() {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PersonsPageComponent],
      providers: [
        {provide: DataProvider, useValue: dataProviderMock},
        {provide: DataLoadService, useValue: dataLoadServiceMock},
        {provide: ChangeDetectorRef, useValue: changeDetectorMock},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonsPageComponent);
    component = fixture.componentInstance;
    testPerson = {
      id:12,
      firstName:'John',
      sex: Sex.MALE,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(', showConfirm()', () => {
    component.showConfirm(testPerson);
    expect(component.person).toEqual(testPerson);
    expect(component.confirmDialogVisible).toBeTrue();
  });

  it(', confirmActionHandler()', () => {
    spyOn(component, 'loadPersons');
    spyOn(dataProviderMock, 'deletePerson').and.returnValue(new Observable(subscriber => subscriber.next(testDataPersons)));
    component.person = testPerson;
    component.confirmActionHandler(ConfirmAction.OK);
    expect(component.confirmDialogVisible).toBeFalse();
    expect(dataProviderMock.deletePerson).toHaveBeenCalledWith(testPerson.id);
    expect(component.loadPersons).toHaveBeenCalled();
  });

  it(', loadPerson()', () => {
    spyOn(dataProviderMock, 'getPersons').and.returnValue(new Observable(subscriber => subscriber.next([testPerson])));
    component.loadPersons();
    expect(dataProviderMock.getPersons).toHaveBeenCalled();
    expect(component.persons).toEqual([testPerson]);
  });
});
