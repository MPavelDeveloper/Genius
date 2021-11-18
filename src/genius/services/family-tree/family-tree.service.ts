import {Injectable} from '@angular/core';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {Family} from '../../../model/family';
import {Observable} from 'rxjs';

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
          for (let personIndex = 0; personIndex < persons.length; personIndex++) {
            if (persons[personIndex].familyId && persons[personIndex].parentFamilyId === null) {
              let rootFamily = families.find(family => family.id === persons[personIndex].familyId);
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
    if (childNode.children.length > 0) {
      childNode.children.forEach(child => {
        this.addNodes(childNode, child, families);
      })
    }
  }

  public createChildrenNodes(currentNode: Node, family: Family, families: Array<Family>): Array<Node> {
    let childrenFamilies: Array<Family> = [];
    family.children.forEach(child => {
      if (child.familyId) {
        childrenFamilies.push(families.find((family) => family.id === child.familyId));
      }
    });

    return (childrenFamilies.length) ? childrenFamilies.map(family => this.createNode(currentNode, family)) : [];
  }

  public createNode(currentNode: Node, family: Family) {
    let node = new Node(family);
    node.parent = currentNode;
    return node;
  }
}

class Node {
  parent: Node;
  data: Family;
  children: Array<Node>;

  constructor(data: Family) {
    this.parent = null;
    this.data = data;
    this.children = [];
  }
}



