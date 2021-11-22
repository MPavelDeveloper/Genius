import {TestBed} from '@angular/core/testing';
import {Node, FamilyTreeService} from './family-tree.service';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {Family} from '../../../model/family';
import {testDataFamilies, testDataPersons, testRootFamily} from '../../../json';
import {Person} from '@angular/cli/utilities/package-json';
import {Observable} from 'rxjs';

describe('FamilyTreeService', () => {
  let service: FamilyTreeService;
  let families: Array<Family>;
  let persons: Array<Person>;
  let rootFamily: Family;
  let node: Node = {
    parent: null,
    data: null,
    children: [],
  };

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
    service = TestBed.inject(FamilyTreeService);
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

});
