import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PersonFormComponent, PersonFormPath, PersonFormTemplateVersion} from './person-form.component';
import {FormsModule} from '@angular/forms';
import {DataProvider} from '../../services/data-provider';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable, Subject} from 'rxjs';
import {testDataPersons} from '../../../json';
import {PersonType} from '../../family.components/family-form/family-form.component';
import {Person, Sex} from '../../../model/person';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {
  ComponentDescriptor,
  SelectPersonTransferService
} from '../../services/select-person-transfer/select-person-transfer.service';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction
} from '../../event.components/life-event/life-event.component';
import {EventPrefix, LifeEvent, LifeEventType} from '../../../model/life-event';
import {
  LifeEventFormActionDescriptor,
  LifeEventFormTemplateAction,
  LifeEventFormType
} from '../../event.components/life-event-form/life-event-form.component';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;
  let testPerson: Person;
  let testLifeEvent: LifeEvent;
  let testLifeEventActionDescriptor: LifeEventActionDescriptor;
  let testLifeEventFormActionDescriptor: LifeEventFormActionDescriptor;
  const dataProviderMock = {
    getPersons() {
      return new Observable(subscriber => subscriber.next(testDataPersons));
    },
    addNewPerson() {
      return new Observable(subscriber => subscriber.next());
    },
    changePerson(person: Person) {
      return new Observable(subscriber => subscriber.next());
    },
    findPerson(personId: number) {
      return new Observable(subscriber => subscriber.next());
    },
    addNewPersonEvent(personId: number, event: LifeEvent) {
      return new Observable(subscriber => subscriber.next());
    },
    deletePersonEvent(personId: number, event: LifeEvent) {
      return new Observable(subscriber => subscriber.next());
    },
  }
  const dataLoadMock = {
    persons$: new Subject(),
    reloadPersons(changedPersons: boolean) {
    }
  }
  const selectPersonTransferServiceMock = {
    componentDescriptor: '',
    person: new Person(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonFormComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {provide: DataProvider, useValue: dataProviderMock},
        {provide: DataLoadService, useValue: dataLoadMock},
        {provide: SelectPersonTransferService, useValue: selectPersonTransferServiceMock},
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    testPerson = {
      id: 3,
      firstName: 'John',
      sex: Sex.MALE,
    };
    testLifeEvent = {
      id: 12,
      type: LifeEventType.BIRTH,
      date: new Date('1989-12-22'),
    }
    testLifeEventActionDescriptor = {
      action: LifeEventTemplateAction.GET,
      lifeEvent: testLifeEvent,
    }
    testLifeEventFormActionDescriptor = {
      action: LifeEventFormTemplateAction.SAVE,
      lifeEvent: testLifeEvent,
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });

  it('should be the same, loadPersons()', () => {
    spyOn(dataProviderMock, 'getPersons').and.returnValue(new Observable(subscriber => subscriber.next(testDataPersons)));
    spyOn(component, 'searchPersonsByCondition')
    component.personType = PersonType.HUSBAND;
    component.loadPersons();
    expect(component.searchPersonsByCondition).toHaveBeenCalled()
    expect(dataProviderMock.getPersons).toHaveBeenCalled();
  });

  it(',searchPersonsByCondition', () => {
    let result = component.searchPersonsByCondition(testDataPersons, ((person: Person) => person.sex === Sex.MALE));
    result.forEach(person => expect(person.sex).toBe(Sex.MALE));
    result = component.searchPersonsByCondition(testDataPersons, ((person: Person) => person.sex === Sex.FEMALE));
    result.forEach(person => expect(person.sex).toBe(Sex.FEMALE));
  });

  it(', toggleViewEditPerson', () => {
    component.person = testPerson;
    component.toggleViewEditPerson();
    expect(component.personClone).toEqual(testPerson);
    expect(component.templateVersion).toBe(PersonFormTemplateVersion.PERSON_EDIT);
  });

  it(',savePerson', () => {
    spyOn(dataProviderMock, 'addNewPerson').and.returnValue(new Observable(subscriber => subscriber.next(testDataPersons)));
    spyOn(dataLoadMock, 'reloadPersons');
    component.savePerson();
    expect(dataProviderMock.addNewPerson).toHaveBeenCalled();
    expect(dataLoadMock.reloadPersons).toHaveBeenCalledWith(true);
  });

  it(', selectPerson', () => {
    component.person = testPerson;
    component.selectPerson();
    expect(selectPersonTransferServiceMock.componentDescriptor).toBe(ComponentDescriptor.PERSON_FORM)
    expect(selectPersonTransferServiceMock.person).toEqual(testPerson);
  });

  it(', changePerson', () => {
    spyOn(dataProviderMock, 'changePerson').and.returnValue(new Observable(subscriber => subscriber.next(true)));
    spyOn(component, 'reloadPerson');
    spyOn(dataLoadMock, 'reloadPersons');
    component.personClone = testPerson
    component.changePerson();
    expect(dataProviderMock.changePerson).toHaveBeenCalledWith(testPerson);
    expect(component.reloadPerson).toHaveBeenCalled();
    expect(dataLoadMock.reloadPersons).toHaveBeenCalled();
  });

  it(', lifeEventHandler', () => {
    spyOn(component, 'lifeEventSimpleClone');
    testLifeEventActionDescriptor.action = LifeEventTemplateAction.DELETE;
    component.lifeEventHandler(testLifeEventActionDescriptor);
    expect(component.confirmDialogVisible).toBeTrue();
    expect(component.lifeEvent).toEqual(testLifeEventActionDescriptor.lifeEvent);
    expect(component.lifeEventSimpleClone).toHaveBeenCalledWith(testLifeEventActionDescriptor.lifeEvent);
    testLifeEventActionDescriptor.action = LifeEventTemplateAction.GET;
    component.lifeEventHandler(testLifeEventActionDescriptor);
    expect(component.lifeEventFormDialogVisible).toBeTrue();
    expect(component.lifeEventFormType).toBe(LifeEventFormType.EXIST_EVENT)
    expect(component.lifeEvent).toEqual(testLifeEventActionDescriptor.lifeEvent);
    expect(component.lifeEventSimpleClone).toHaveBeenCalledWith(testLifeEventActionDescriptor.lifeEvent);
  });

  it(', lifeEventFormHandler', () => {
    spyOn(component, 'changeLifeEvent');
    spyOn(component, 'saveLifeEvent');
    component.person = testPerson;
    testLifeEventFormActionDescriptor.action = LifeEventFormTemplateAction.CHANGE;
    component.lifeEventFormHandler(testLifeEventFormActionDescriptor);
    expect(component.changeLifeEvent).toHaveBeenCalledWith(testPerson.id, testLifeEventFormActionDescriptor.lifeEvent);
    testLifeEventFormActionDescriptor.action = LifeEventFormTemplateAction.SAVE;
    component.lifeEventFormHandler(testLifeEventFormActionDescriptor);
    expect(component.saveLifeEvent).toHaveBeenCalledWith(testPerson.id, testLifeEventFormActionDescriptor.lifeEvent);

  });

  it(', changeLifeEvent', () => {
    spyOn(dataProviderMock, 'deletePersonEvent').and.returnValue(new Observable(subscriber => subscriber.next()));
    spyOn(dataProviderMock, 'addNewPersonEvent').and.returnValue(new Observable(subscriber => subscriber.next()));
    spyOn(component, 'reloadPerson')
    component.changeLifeEvent(testPerson.id, testLifeEvent);
    expect(dataProviderMock.deletePersonEvent).toHaveBeenCalledWith(testPerson.id, testLifeEvent);
    expect(dataProviderMock.addNewPersonEvent).toHaveBeenCalledWith(testPerson.id, testLifeEvent);
    expect(component.reloadPerson).toHaveBeenCalled();
  });

  it(', saveLifeEvent', () => {
    spyOn(dataProviderMock, 'addNewPersonEvent').and.returnValue(new Observable(subscriber => subscriber.next()));
    spyOn(component, 'reloadPerson');
    component.saveLifeEvent(testPerson.id, testLifeEvent);
    expect(dataProviderMock.addNewPersonEvent).toHaveBeenCalledWith(testPerson.id, testLifeEvent);
    expect(component.reloadPerson).toHaveBeenCalled();
  });

  it(', confirmActionHandler', () => {
    spyOn(dataProviderMock, 'deletePersonEvent').and.returnValue(new Observable(subscriber => subscriber.next()));
    spyOn(component, 'reloadPerson')
    component.person = testPerson;
    component.lifeEventClone = testLifeEvent;
    component.confirmActionHandler(ConfirmAction.OK);
    expect(dataProviderMock.deletePersonEvent).toHaveBeenCalledWith(testPerson.id, testLifeEvent);
    expect(component.reloadPerson).toHaveBeenCalled();
  });

  it(', createLifeEvent', () => {
    let lifeEventTemplate: LifeEvent = new LifeEvent()
    lifeEventTemplate.type = LifeEventType.DEFAULT;
    lifeEventTemplate.prefix = EventPrefix.NONE;
    component.createLifeEvent()
    expect(component.lifeEventClone).toEqual(lifeEventTemplate);
    expect(component.lifeEventFormDialogVisible).toBeTrue()
    expect(component.lifeEventFormType).toBe(LifeEventFormType.NEW_EVENT)
  });

  it(', exit', () => {
    component.exit();
    expect(component.templateVersion).toBe(PersonFormTemplateVersion.PERSON_VIEW);
  });

  it(', getPersonFullName', () => {
    component.person = testPerson;
    expect(component.getPersonFullName()).toBe(testPerson.firstName +'  ');
  });

  it(', reloadPerson', () => {
    let person: Person = <Person>{id:3};
    component.person = person;
    spyOn(dataProviderMock, 'findPerson').and.returnValue(new Observable(subscriber => subscriber.next(testPerson)));
    component.reloadPerson();
    expect(dataProviderMock.findPerson).toHaveBeenCalledWith(person.id);

  });

  it(', setChangePerson', () => {
    component.setChangePerson(testPerson);
    expect(component.person).toEqual(testPerson);
  });

  it(', closePersonSelect', () => {
    component.closePersonSelect();
    expect(selectPersonTransferServiceMock.componentDescriptor).toBe(ComponentDescriptor.PERSON_FORM)
  });

  it(', getRouterLink', () => {
    component.familyId = 12;
    component.currentPersonFormPath = PersonFormPath.ADD_IN_EXIST_FAMILY;
    expect(component.getRouterLink()).toEqual(['/editFamily', component.familyId]);
    component.currentPersonFormPath = PersonFormPath.ADD_IN_NEW_FAMILY;
    expect(component.getRouterLink()).toEqual(['/createFamily', '']);
  });

});
