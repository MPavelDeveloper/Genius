import {TestBed} from '@angular/core/testing';
import {Node, FamilyTreeService} from './family-tree.service';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {Family} from '../../../model/family';
import {testDataFamilies, testDataPersons, testFamilyTreeGridRow, testRootFamily, testRootNode} from '../../../json';
import {Person} from '@angular/cli/utilities/package-json';
import {Observable} from 'rxjs';

describe('FamilyTreeService', () => {
  let service: FamilyTreeService;
  let families: Array<Family>;
  let persons: Array<Person>;
  let rootFamily: Family;
  let rootNode: Node;
  let node: Node = {
    parent: null,
    data: null,
    children: [],
  };
  let familyTreeGridRow: Array<Array<Node>>;

  class HttpServiceMock {
    getFamilies(): Observable<Array<Family>> {
      return new Observable(subscriber => subscriber.next(families));
    }

    getPersons(): Observable<Array<Person>> {
      return new Observable(subscriber => {
        subscriber.next(persons)
      });
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: HttpDataProvider, useClass: HttpServiceMock}],
    });
    families = testDataFamilies;
    persons = testDataPersons;
    rootFamily = testRootFamily;
    rootNode = testRootNode;
    service = TestBed.inject(FamilyTreeService);
    familyTreeGridRow = testFamilyTreeGridRow;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be the same; getRootFamily()', () => {
    service.getRootFamily(families).subscribe(rootFamily => {
      expect(rootFamily.id).toBe(testRootFamily.id);
      expect(rootFamily.husband.id).toBe(testRootFamily.husband.id);
      expect(rootFamily.wife.id).toBe(testRootFamily.wife.id);
    })
  });

  it('should be the same; createFamilyTree()', () => {
    service.createFamilyTree().subscribe(familyTree => {
      expect(familyTree.data).toBe(families[0]);
      expect(familyTree.children[0].data).toBe(families[1])
    })
  });

  it('should be the same; createChildrenNodes()', () => {
    let childNodes = service.createChildrenNodes(node, rootFamily, families);
    expect(childNodes[0].data).toBe(families[1])
  })

  it('the nodes should be the same in Grid, createFamilyTreeGrid()', () => {
    let familyTreeGrid = [];
    rootNode.children = service.createChildrenNodes(rootNode, rootNode.data, families);
    familyTreeGrid = service.createFamilyTreeGrid([[rootNode]], [[[rootNode]]]);
    expect(familyTreeGrid[0][0][0].data).toEqual(families[0]);
    expect(familyTreeGrid[1][0][0].data).toEqual(families[1]);
  });

  it('the nodes should be the same in Grid Row, createFamilyGridRow()', () => {
    let familyTreeGridRow: Array<Array<Node>> = [];
    rootNode.children = service.createChildrenNodes(rootNode, rootNode.data, families);
    familyTreeGridRow = service.createFamilyGridRow([[rootNode]]);
    for (let nodeSet of familyTreeGridRow) {
      for (let node of nodeSet) {
        expect(families.includes(node.data)).toBeTrue();
      }
    }
  });

  it('data in nodes should be family or null, createGridNodeSet()', () => {
    let gridNodeSet: Array<Node> = [];
    let maxChildNumber = 3;
    gridNodeSet = service.createGridNodeSet(maxChildNumber, rootNode);
    expect(gridNodeSet.length).toBe(maxChildNumber);
    for(let node of gridNodeSet) {
      expect(families.includes(node.data) || node.data === null).toBeTrue()
    }
  });

  it('should be the same, getMaxChildNumber()', () => {
    const childAmount = service.getMaxChildNumber(familyTreeGridRow);
    expect(childAmount).toBe(0);
  });

  it('should be the same, getFamilyGridRowNodes()', () => {
    const nodes: Array<Node> = service.getFamilyGridRowNodes(familyTreeGridRow);
    let result: Array<Node> = [];
    familyTreeGridRow.forEach(nodeSet => result = result.concat(nodeSet));
    expect(result.length).toBe(nodes.length);
    nodes.forEach(node => {
      expect(result.includes(node)).toBeTrue();
    });
  });

  it(', checkFamilyGridRow()', () => {
    expect(service.checkFamilyGridRow([])).toBeFalse();
    expect(service.checkFamilyGridRow(familyTreeGridRow)).toBeTrue();
  });
});
