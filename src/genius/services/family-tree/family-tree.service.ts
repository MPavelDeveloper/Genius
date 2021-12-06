import {Injectable} from '@angular/core';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {Family} from '../../../model/family';
import {Observable} from 'rxjs';
import * as Pipe from 'ramda';
import {Person} from '../../../model/person';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private root: Node;
  private familyTreeGrid: Array<Array<Array<Node>>>;

  constructor(public dataProvider: HttpDataProvider) {
    this.familyTreeGrid = [];
  }

  public createFamilyTree(): Observable<Node> {
    return new Observable(subscriber => {
      this.dataProvider.getFamilies().subscribe(families => {
          this.getRootFamily(families).subscribe(rootFamily => {
              if (rootFamily) {
                this.root = new Node(rootFamily);
                this.root.children = this.createChildrenNodes(this.root, rootFamily, families);
                this.root.children.forEach(childNode => this.addNodes(this.root, childNode, families));
                this.familyTreeGrid = this.createFamilyTreeGrid([[this.root]], [[[this.root]]]);
                subscriber.next(this.root);
              } else {
                subscriber.next(null);
              }
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    })
  }

  public getRootFamily(families: Array<Family>): Observable<Family> {
    return this.dataProvider.getPersons().pipe(
      map((persons: Array<Person>) => {
          for (let person of persons) {
            if (person.familyId && person.parentFamilyId === null) {
              return this.findFamily(person.familyId, families);
            }
          }
          return null;
        }
      ));
  }

  public addNodes(parentNode: Node, childNode: Node, families: Array<Family>) {
    childNode.children = this.createChildrenNodes(parentNode, childNode.data, families);
    childNode.children.forEach(child => {
      this.addNodes(childNode, child, families);
    });
  }

  public createChildrenNodes(currentNode: Node, family: Family, families: Array<Family>): Array<Node> {
    return Pipe.filter((child: Person) => !!child.familyId, family.children)
      .map((child: Person) => this.findFamily(child.familyId, families))
      .map((family: Family) => this.createNode(currentNode, family));
  }

  public findFamily(familyId: number, families: Array<Family>): Family {
    return families.find((family) => family.id === familyId);
  }

  public createNode(currentNode: Node, family: Family): Node {
    let node = new Node(family);
    node.parent = currentNode;
    return node;
  }


  public getFamilyTreeGrid() {
    return this.familyTreeGrid;
  }

  public createFamilyTreeGrid(gridRow: Array<Array<Node>>, familyTreeGrid: Array<Array<Array<Node>>>): Array<Array<Array<Node>>> {
    let nextGridRow = this.createFamilyGridRow(gridRow);
    if (this.checkFamilyGridRow(nextGridRow)) {
      familyTreeGrid.push(nextGridRow);
      this.createFamilyTreeGrid(nextGridRow, familyTreeGrid);
    }

    return familyTreeGrid;
  }

  public createFamilyGridRow(familyTreeGridRow: Array<Array<Node>>): Array<Array<Node>> {
    let nextGridRow: Array<Array<Node>> = [];
    let maxChildNumber = this.getMaxChildNumber(familyTreeGridRow);
    let gridRowNodes = this.getFamilyGridRowNodes(familyTreeGridRow);
    gridRowNodes.forEach(node => {
      nextGridRow.push(this.createGridNodeSet(maxChildNumber, node));
    });

    return nextGridRow;
  }

  public createGridNodeSet(maxChildNumber: number, node: Node): Array<Node> {
    let nodeSet: Array<Node> = [];
    nodeSet = nodeSet.concat(node.children);
    if (nodeSet.length < maxChildNumber) {
      while (nodeSet.length < maxChildNumber) {
        nodeSet.push(new Node(null))
      }
    }
    return nodeSet;
  }

  public getMaxChildNumber(familyTreeGridRow: Array<Array<Node>>): number {
    let nodes = this.getFamilyGridRowNodes(familyTreeGridRow);
    let childMaxNumber = 0;
    nodes.forEach(node => {
      if (node.children.length > childMaxNumber) {
        childMaxNumber = node.children.length;
      }
    });
    return childMaxNumber;
  }

  public getFamilyGridRowNodes(familyTreeGridRow: Array<Array<Node>>): Array<Node> {
    let nodes: Array<Node> = [];
    familyTreeGridRow.forEach(nodeSet => nodes = nodes.concat(nodeSet));
    return nodes;
  }

  public checkFamilyGridRow(familyGridRow: Array<Array<Node>>): boolean {
    let nodes = this.getFamilyGridRowNodes(familyGridRow);
    for (let node of nodes) {
      if (node.data) {
        return true;
      }
    }
    return false;
  }
}


export class Node {
  parent: Node;
  data: Family;
  children: Array<Node>;

  constructor(data: Family) {
    this.parent = null;
    this.data = data;
    this.children = [];
  }
}



