import {Injectable} from '@angular/core';
import {HttpDataProvider} from '../http-provider/http-data-provider.service';
import {Family} from '../../../model/family';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private familyTree: Array<Array<Family>>;

  constructor(private dataProvider: HttpDataProvider) {
  }

  private getRootFamily(families: Array<Family>): Observable<Family> {
    return new Observable(subscriber => {
      for (let familyIndex = 0; familyIndex < families.length; familyIndex++) {
        let family = families[familyIndex];
        for (let childIndex = 0; childIndex < family.children.length; childIndex++) {
          if (family.children[childIndex].familyId) {
            break;
          } else if (childIndex === family.children.length - 1) {
            subscriber.next(family);
            return;
          }
        }
      }
    })
  }

  private searchRelatedFamilies(currentFamilies: Array<Family>, families: Array<Family>): void {
    let result: Array<Family> = [];
    currentFamilies.forEach(family => {
      if (family.husband?.parentFamilyId) {
        const husbandParentsFamily = this.findParentFamily(family.husband.parentFamilyId, families);
        if (husbandParentsFamily) result.push(husbandParentsFamily);
      }
      if (family.wife?.parentFamilyId) {
        const wifeParentsFamily = this.findParentFamily(family.wife.parentFamilyId, families);
        if (wifeParentsFamily) result.push(wifeParentsFamily);
      }
    });

    if (result.length) {
      this.familyTree.push(result);
      this.searchRelatedFamilies(result, families);
    } else {
      return;
    }

  }

  private findParentFamily(parentFamilyId: number, families: Array<Family>): Family {
    return  families.find(currentFamily => currentFamily.id === parentFamilyId);
  }

  public getFamilyTree(): Observable<Array<Array<Family>>> {
    this.familyTree = []
    return new Observable(subscriber => {
      this.dataProvider.getFamilies().subscribe(families => {
        this.getRootFamily(families).subscribe(rootFamily => {
          this.familyTree.push([rootFamily]);
          this.searchRelatedFamilies([rootFamily], families);
          // ??? case: create new family(person as husband -> person as child)
          subscriber.next(this.familyTree);
          return;
        });
      });
    });
  }

}

