import {Injectable} from '@angular/core';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {Family} from '../../../model/family';
import {Observable} from 'rxjs';
import * as Pipe from 'ramda';
import {Person} from '../../../model/person';

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private root: Node;

  constructor(public dataProvider: HttpDataProvider) {
  }

  public createFamilyTree(): Observable<Node> {
    return new Observable(subscriber => {
      this.dataProvider.getFamilies().subscribe(families => {
          this.getRootFamily(families).subscribe(rootFamily => {
              this.root = new Node(rootFamily);
              this.root.children = this.createChildrenNodes(this.root, rootFamily, families);
              this.root.children.forEach(childNode => {
                this.addNodes(this.root, childNode, families);
              })
              subscriber.next(this.root);
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
    return new Observable(subscriber => {
      this.dataProvider.getPersons().subscribe(persons => {
          for (let person of persons) {
            if (person.familyId && person.parentFamilyId === null) {
              let rootFamily = this.findFamily(person.familyId, families);
              subscriber.next(rootFamily);
              return;
            }
          }
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    });
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

  public traversal() {
    let result: Array<Node> = [];
    this.traversalInOrder(this.root, result);
    return result;
  }

  public traversalInOrder(node: Node, result: Array<Node>) {
    node.children.forEach(childNode => {
      this.traversalInOrder(childNode, result);
    })
    result.push(node)
  }

  public getFamilyTreeLevels(): Array<Array<Node>> {
    let familyTreeLevels: Array<Array<Node>> = [];
    familyTreeLevels.push([this.root]);
    for (let level = 0; level < familyTreeLevels.length; level++) {
      this.createFamilyTreeLevels(familyTreeLevels, familyTreeLevels[level]);
    }

    return familyTreeLevels;
  }

  public createFamilyTreeLevels(familyTreeLevels: Array<Array<Node>>, nodes: Array<Node>): void {
    let level: Array<Node> = [];
    nodes.forEach(node => {
      if (node.children.length) {
        level = level.concat(node.children);
      }
    });

    if (level.length) {
      familyTreeLevels.push(level);
    }
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



