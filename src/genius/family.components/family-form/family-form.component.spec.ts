import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FamilyFormComponent, FamilyFormPath, PersonType} from './family-form.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Person, Sex} from '../../../model/person';
import {DataProvider} from '../../services/data-provider';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ActivatedRoute} from '@angular/router';
import {testRootFamily} from '../../../json';
import {deepClone, random} from '../../utils/utils';
import {Observable} from 'rxjs';
import {Family} from '../../../model/family';
import {EventPrefix, LifeEvent, LifeEventType} from '../../../model/life-event';
import {
  LifeEventFormActionDescriptor,
  LifeEventFormTemplateAction,
  LifeEventFormType
} from '../../event.components/life-event-form/life-event-form.component';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction
} from '../../event.components/life-event/life-event.component';
import {SelectPersonTransferService} from '../../services/select-person-transfer/select-person-transfer.service';
import {FormsModule} from '@angular/forms';

describe('FamilyFormComponent', () => {
  let component: FamilyFormComponent;
  let fixture: ComponentFixture<FamilyFormComponent>;
  let testHusband: Person;
  let testFamily: Family;
  let testFamilyEvent: LifeEvent;
  let lifeEventActionDescriptor: LifeEventActionDescriptor;
  let lifeEventFormActionDescriptor: LifeEventFormActionDescriptor;
  const dataLoadServiceSpy = jasmine.createSpyObj(['reloadFamilies']);
  const dataProviderSpy = jasmine.createSpyObj([
    'findFamily',
    'changePerson',
    'addNewPerson',
    'addNewFamily',
    'changeFamily',
    'addNewFamilyEvent',
    'deleteFamilyEvent',
  ]);
  const activateRouteMock = {};
  const selectPersonTransferService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [FamilyFormComponent],
      providers: [
        {provide: DataProvider, useValue: dataProviderSpy},
        {provide: DataLoadService, useValue: dataLoadServiceSpy},
        {provide: ActivatedRoute, useValue: activateRouteMock},
        {provide: SelectPersonTransferService, useValue: selectPersonTransferService}
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyFormComponent);
    component = fixture.componentInstance;
    testHusband = {
      id: 12,
      firstName: 'Tomas',
      lastName: 'U',
      middleName: 'Nickson',
      sex: Sex.MALE,
      lifeEvents: [],
    }
    testFamily = {
      id: 1,
      husband: {
        id: 1,
        firstName: 'Tom',
        lastName: 'James',
        middleName: 'Nickson',
        sex: Sex.MALE,
        familyId: 1,
        parentFamilyId: null,
      },
      wife: {
        id: 2,
        firstName: 'Lola',
        lastName: 'James',
        middleName: 'Kan',
        sex: Sex.FEMALE,
        familyId: 1,
        parentFamilyId: null,
      },
      children: [{
        id: 3,
        firstName: 'John',
        lastName: 'James',
        middleName: 'Tomson',
        sex: Sex.MALE,
        parentFamilyId: 1,
        familyId: 2,
      }],
    };
    testFamilyEvent = {
      type: LifeEventType.BIRTH,
      date: new Date('1989-12-22'),
    };
    lifeEventActionDescriptor = {
      action: LifeEventTemplateAction.GET,
      lifeEvent: testFamilyEvent,
    }
    lifeEventFormActionDescriptor = {
      action: LifeEventFormTemplateAction.CANCEL,
      lifeEvent: testFamilyEvent,
    }
    component.family = testFamily;
    component.familyClone = deepClone(testRootFamily);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it(', saveFamily()', () => {
  //   spyOn(component, 'familyValid').and.returnValue(true);
  //   spyOn(component, 'getFamilyPersons').and.returnValue([testHusband, testWife, testChild]);
  //   dataProviderSpy.addNewFamily.and.returnValue(new Observable(subscriber => subscriber.next(testHusband)));
  //   dataProviderSpy.changeFamily.and.returnValue(new Observable(subscriber => subscriber.next(testWife)));
  //   component.saveFamily();
  //   expect(component.familyValid).toHaveBeenCalled();
  //   expect(component.getFamilyPersons).toHaveBeenCalled();
  // });

  it('should be the same, findFamily()', () => {
    dataProviderSpy.findFamily.and.returnValue(new Observable(subscriber => subscriber.next(testFamily)));
    component.findFamily(testFamily.id);
    expect(dataProviderSpy.findFamily).toHaveBeenCalledWith(testFamily.id);
  });

  it('should be the same, addSelectPersonInFamily()', () => {
    component.addSelectPersonInFamily(PersonType.HUSBAND, testHusband, null);
    expect(component.familyClone.husband).toEqual(testHusband);
  });

  it('should be the same, selectPerson()', () => {
    component.selectPerson(PersonType.HUSBAND, null);
    expect(component.person).toEqual(testFamily.husband);
    component.selectPerson(PersonType.WIFE, null);
    expect(component.person).toEqual(testFamily.wife);
    component.selectPerson(PersonType.CHILD, 0);
    expect(component.person).toEqual(testFamily.children[0])
  });

  it(', deletePerson()', () => {
    component.deletePerson(PersonType.HUSBAND, null);
    expect(component.familyClone.husband).toBeNull();
    component.deletePerson(PersonType.WIFE, null);
    expect(component.familyClone.wife).toBeNull();
    component.deletePerson(PersonType.CHILD, 0);
    expect(component.familyClone.children.length).toBe(0);
  });

  it('should be called, addNewLifeEvent()', () => {
    dataProviderSpy.addNewFamilyEvent.and.returnValue(new Observable(subscriber => subscriber.next(true)));
    spyOn(component, 'reloadFamily');
    component.addNewLifeEvent(testFamily.id, testFamilyEvent);
    expect(dataProviderSpy.addNewFamilyEvent).toHaveBeenCalledWith(testFamily.id, testFamilyEvent);
    expect(component.reloadFamily).toHaveBeenCalled();
  });

  it('should be called, changeLifeEvent()', () => {
    dataProviderSpy.deleteFamilyEvent.and.returnValue(new Observable(subscriber => subscriber.next(true)));
    dataProviderSpy.addNewFamilyEvent.and.returnValue(new Observable(subscriber => subscriber.next(true)));
    spyOn(component, 'reloadFamily');
    component.changeLifeEvent(testFamily.id, testFamilyEvent);
    expect(dataProviderSpy.deleteFamilyEvent).toHaveBeenCalledWith(testFamily.id, testFamilyEvent);
    expect(dataProviderSpy.addNewFamilyEvent).toHaveBeenCalledWith(testFamily.id, testFamilyEvent);
    expect(component.reloadFamily).toHaveBeenCalled();
  });

  it('should be called, deleteLifeEvent()', () => {
    dataProviderSpy.deleteFamilyEvent.and.returnValue(new Observable(subscriber => subscriber.next(true)));
    spyOn(component, 'reloadFamily');
    component.deleteLifeEvent(testFamily.id, testFamilyEvent);
    expect(dataProviderSpy.deleteFamilyEvent).toHaveBeenCalledWith(testFamily.id, testFamilyEvent);
    expect(component.reloadFamily).toHaveBeenCalled();
  });

  it('should be the same, createLifeEvent()', () => {
    component.createLifeEvent();
    expect(component.lifeEventFormType).toBe(LifeEventFormType.NEW_EVENT);
    expect(component.lifeEventClone.type).toBe(LifeEventType.DEFAULT);
    expect(component.lifeEventClone.prefix).toBe(EventPrefix.NONE);
    expect(component.lifeEventFormDialogVisiable).toBeTrue();
  });

  it('should be called, lifeEventHandler()', () => {
    spyOn(component, 'deleteLifeEvent');
    component.lifeEventHandler(lifeEventActionDescriptor);
    lifeEventActionDescriptor.lifeEvent = deepClone(lifeEventActionDescriptor.lifeEvent)
    expect(component.lifeEventClone).toEqual(lifeEventActionDescriptor.lifeEvent);
    expect(component.lifeEventFormDialogVisiable).toBeTrue();
    expect(component.lifeEventFormType).toBe(LifeEventFormType.EXIST_EVENT);
    lifeEventActionDescriptor.action = LifeEventTemplateAction.DELETE;
    component.lifeEventHandler(lifeEventActionDescriptor);
    expect(component.deleteLifeEvent).toHaveBeenCalledWith(component.family.id, lifeEventActionDescriptor.lifeEvent);
  });

  it('should be called, lifeEventFormHandler()', () => {
    spyOn(component, 'changeLifeEvent');
    spyOn(component, 'addNewLifeEvent');
    lifeEventFormActionDescriptor.action = LifeEventFormTemplateAction.CHANGE;
    component.lifeEventFormHandler(lifeEventFormActionDescriptor)
    expect(component.changeLifeEvent).toHaveBeenCalledWith(component.family.id, lifeEventFormActionDescriptor.lifeEvent);
    lifeEventFormActionDescriptor.action = LifeEventFormTemplateAction.SAVE;
    component.lifeEventFormHandler(lifeEventFormActionDescriptor)
    expect(component.addNewLifeEvent).toHaveBeenCalledWith(component.family.id, lifeEventFormActionDescriptor.lifeEvent);
  });

  it('should be called, cancelChanges()', () => {
    component.familyClone.husband = null;
    expect(component.familyClone.husband).toBeNull();
    component.cancelChanges();
    expect(component.familyClone.husband).toEqual(testFamily.husband);
  });

  it('should be the same, getFamilyPersons()', () => {
    let result = component.getFamilyPersons(testFamily)
     expect(result).toEqual([testFamily.husband, testFamily.wife, ...testFamily.children]);
  });

  it('should be true, familyValid()', () => {
   spyOn(component, 'getCompleteChildrenAmount');
   let result = component.familyValid(testFamily);
   expect(result).toBeTrue();
   expect(component.getCompleteChildrenAmount).toHaveBeenCalled();
  });

  it('should be the same, addChildTemplate()', () => {
    component.addChildTemplate();
    expect(component.person).toEqual(new Person());
    expect(component.familyClone.children[component.familyClone.children.length - 1]).toEqual(new Person());
  });

  it('should be true / false, checkChild()', () => {
    expect(component.checkChild(0)).toBeTrue();
    component.familyClone.children.push(new Person());
    expect(component.checkChild(component.familyClone.children.length - 1)).toBeFalse();
  });

  it(', getCompleteChildrenAmount()', () => {
    expect(component.getCompleteChildrenAmount()).toBe(1);
  });

  it(', isBtnAddChildTemplateDisabled()', () => {
    expect(component.isBtnAddChildTemplateDisabled()).toBeFalse()
  });

  it(', exitFamilyEditor()', () => {
    let templateServiceResult: any = {
      componentDescriptor: null,
      person : null,
      personType : null,
      familyId : null,
      family : null,
      currentChildIndex : null,
      personFormTemplateVersion : null,
    }
    component.exitFamilyEditor()
    expect(selectPersonTransferService).toEqual(templateServiceResult);
  });

  it(', reloadFamily()', () => {
    let emptyFamily = new Family();
        emptyFamily.id = random(12,0);
    dataProviderSpy.findFamily.and.returnValue(new Observable(subscriber => subscriber.next(emptyFamily)));
    component.reloadFamily(emptyFamily.id)
    expect(dataProviderSpy.findFamily).toHaveBeenCalledWith(emptyFamily.id);
    expect(component.family).toEqual(emptyFamily)
  });

  it(', getRouterLink()', () => {
    component.currentFamilyFormPath = FamilyFormPath.CREATE;
    expect(component.getRouterLink()).toBe('/addPersonInNewFamily');
    component.currentFamilyFormPath = FamilyFormPath.EDIT;
    expect(component.getRouterLink()).toBe('/selectPerson');
  });

  it(', getRouterLinkCloseBtn()', () => {
    component.currentFamilyFormPath = FamilyFormPath.CREATE;
    expect(component.getRouterLinkCloseBtn()).toEqual(['/Families', '']);
    component.currentFamilyFormPath = FamilyFormPath.EDIT;
    expect(component.getRouterLinkCloseBtn()).toEqual(['/viewFamily', component.family.id])
  });
});
