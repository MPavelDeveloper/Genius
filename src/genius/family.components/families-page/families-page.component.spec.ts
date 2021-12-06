import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FamiliesPageComponent} from './families-page.component';
import {DataProvider} from '../../services/data-provider';
import {testRootFamily} from '../../../json';
import {Node, FamilyTreeService} from '../../services/family-tree/family-tree.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {random} from '../../utils/utils';
import {By} from '@angular/platform-browser';

describe('FamiliesPageComponent', () => {
  let component: FamiliesPageComponent;
  let fixture: ComponentFixture<FamiliesPageComponent>;
  let dataProviderSpy = jasmine.createSpyObj(['deleteFamily']);
  let familyTreeServiceSpy = jasmine.createSpyObj(['createFamilyTree', 'getFamilyTreeGrid']);
  let testNode: Node;
  let testFamilyTreeGrid: Array<Array<Array<Node>>>;
  let styleList: Array<String> = [
    'arrow-center',
    'arrow-big-left',
    'arrow-big-right',
    'arrow-left_x4',
    'arrow-right_x4',
    'arrow-left_xN',
    'arrow-right_xN',
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesPageComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: DataProvider, useValue: dataProviderSpy},
        {provide: FamilyTreeService, useValue: familyTreeServiceSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesPageComponent);
    component = fixture.componentInstance;
    testNode = new Node(testRootFamily);
    testFamilyTreeGrid = [[[testNode]]];
    component.familyTreeGrid = testFamilyTreeGrid;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be the same, showConfirm()', () => {
    component.showConfirm(testRootFamily);
    expect(component.familyId).toBe(testRootFamily.id);
    expect(component.confirmDialogVisible).toBeTrue();
  })

  it('should be the same, confirmActionHandler()', () => {
    dataProviderSpy.deleteFamily.and.returnValue(new Observable(subscriber => subscriber.next(true)));
    spyOn(component, 'loadFamilyTree');
    component.familyId = testRootFamily.id;
    component.confirmActionHandler(ConfirmAction.OK);
    expect(dataProviderSpy.deleteFamily).toHaveBeenCalledWith(testRootFamily.id);
    expect(component.loadFamilyTree).toHaveBeenCalled();
    expect(component.confirmDialogVisible).toBeFalse();
  });

  it('should be the same, loadFamilyTree()', () => {
    component.familyTreeGrid = [];
    familyTreeServiceSpy.createFamilyTree.and.returnValue(new Observable(subscriber => subscriber.next(true)));
    familyTreeServiceSpy.getFamilyTreeGrid.and.returnValue(testFamilyTreeGrid);
    component.loadFamilyTree();
    expect(familyTreeServiceSpy.createFamilyTree).toHaveBeenCalled();
    expect(familyTreeServiceSpy.getFamilyTreeGrid).toHaveBeenCalled();
    expect(component.familyTreeGrid).toEqual(testFamilyTreeGrid);
  });

  it('should be the same, getFamilyStyle()', () => {
    let emptyNode = new Node(null);
    let styleExistFamily = component.getFamilyStyle(testNode);
    let styleNonExistFamily = component.getFamilyStyle(emptyNode);
    expect(styleExistFamily).toBe('family');
    expect(styleNonExistFamily).toBe('family-none');
  });

  it('should be the same, getArrowStyle()', () => {
    let parentAmount = random(4, 1);
    let childNumber = random(2,1);
    let nodeIndex = random(1, 0);
    let style = component.getArrowStyle(parentAmount, childNumber, nodeIndex);
    expect(styleList.includes(style)).toBeTrue();
    expect(component.getArrowStyle(0, 0,0 )).toBeUndefined();
  });

  it('should be in DOM, FamilyNode', () => {
    let familyDomElement = fixture.debugElement.query(By.css('.family'));
    expect(familyDomElement).toBeDefined();
  });

  it('should be called, Button', () => {
    spyOn(component, 'showConfirm');
    let btnDelete = fixture.debugElement.query(By.css('.button-delete'));
    btnDelete.nativeElement.click();
    expect(component.showConfirm).toHaveBeenCalled();
  });

});
