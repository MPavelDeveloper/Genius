import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {Family} from '../../../model/family';
import {Person} from '../../../model/person';
import {PersonFormTemplateVersion} from '../../person.components/person-form/person-form.component';
import {DataProvider} from '../../services/data-provider';
import {ActivatedRoute} from '@angular/router';
import {PersonTemplateType} from '../../person.components/person/person.component';
import {ComponentDescriptor, SelectPersonTransferService} from '../../services/select-person-transfer/select-person-transfer.service';
import {DataLoadService} from '../../services/data-load/data-load.service';

export enum FamilyFormTemplateVersion {
  FAMILY_VIEW = 'view',
  FAMILY_EDITOR = 'edit',
}

export enum PersonType {
  HUSBAND = 'husband',
  WIFE = 'wife',
  CHILD = 'child',
}

export enum FamilyFormPath {
  VIEW = 'viewFamily/:id',
  CREATE = 'createFamily',
  EDIT = 'editFamily/:id',
}

@Component({
  selector: 'family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent implements OnInit {
  @Input() templateVersion: FamilyFormTemplateVersion;
  public person: Person;
  public family: Family;
  public familyClone: Family;
  public currentChildIndex: number;
  public familyFormTemplateVersion;
  public personTemplateVersion;
  public personType;

  constructor(private dataProvider: DataProvider, private activateRoute: ActivatedRoute, private selectPersonTransferService: SelectPersonTransferService, private dataLoadService: DataLoadService) {
    this.person = new Person();
    this.family = new Family();

    this.familyFormTemplateVersion = FamilyFormTemplateVersion;
    this.personTemplateVersion = PersonTemplateType;
    this.personType = PersonType;
  }

  public ngOnInit() {
    if (this.activateRoute.snapshot && this.activateRoute.snapshot.routeConfig) {
      let path = this.activateRoute.snapshot.routeConfig.path

      if(path === FamilyFormPath.CREATE) {
        this.family = new Family();
        this.familyClone = this.family;
        this.templateVersion = FamilyFormTemplateVersion.FAMILY_EDITOR;
      }
      else if (path === FamilyFormPath.VIEW) {
        this.findFamily(this.activateRoute.snapshot.params.id)
        this.templateVersion = FamilyFormTemplateVersion.FAMILY_VIEW;
      }
      else if (path === FamilyFormPath.EDIT && this.selectPersonTransferService.componentDescriptor === ComponentDescriptor.PERSON_FORM) {
        this.family = this.selectPersonTransferService.familyClone
        this.familyClone = this.cloneFamily(this.family);
        this.templateVersion = FamilyFormTemplateVersion.FAMILY_EDITOR;
        this.addSelectPersonInFamily(this.selectPersonTransferService.personType, this.selectPersonTransferService.person, this.selectPersonTransferService.currentChildIndex);
      }
      else if (path === FamilyFormPath.EDIT) {
        this.dataProvider.findFamily(this.activateRoute.snapshot.params.id).subscribe(family => {
            this.family = family;
            this.familyClone = this.cloneFamily(family);
            this.templateVersion = FamilyFormTemplateVersion.FAMILY_EDITOR;
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          })
      }
    }
  }

  public saveFamily(): void {
    if (this.familyValid(this.familyClone)) {
      let saveTasks: Array<Observable<Object>> = this.getFamilyPersons(this.familyClone)
        .map(person => {
          if (person.id) {
            return this.dataProvider.changePerson(person);
          } else {
            return this.dataProvider.addNewPerson(person);
          }
        })

      forkJoin(saveTasks).subscribe(() => {
        if (this.familyClone.id) {
          this.dataProvider.changeFamily(this.familyClone).subscribe(() => {
            this.dataLoadService.reloadFamilies(true)
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        } else {
          this.dataProvider.addNewFamily(this.familyClone).subscribe(() => {
              this.dataLoadService.reloadFamilies(true)
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        }
      });
    }
  }

  public addSelectPersonInFamily(personType: PersonType, person: Person, childIndex: number): void {
    if (personType === PersonType.HUSBAND) {
      this.familyClone.husband = person;
    } else if (personType === PersonType.WIFE) {
      this.familyClone.wife = person;
    } else if (personType === PersonType.CHILD) {
      this.familyClone.children[childIndex] = person
    }
  }

  public selectPerson(personType: PersonType, childIndex: number): void {
    if (personType === PersonType.HUSBAND) {
      (this.familyClone.husband) ? this.person = this.familyClone.husband : this.person = new Person();
    } else if (personType === PersonType.WIFE) {
      (this.familyClone.wife) ? this.person = this.familyClone.wife : this.person = new Person();
    } else if (personType === PersonType.CHILD) {
      (this.familyClone.children[childIndex]) ? this.person = this.familyClone.children[childIndex] : this.person = new Person();
      this.currentChildIndex = childIndex;
      this.selectPersonTransferService.currentChildIndex = this.currentChildIndex;
    }
    this.selectPersonTransferService.componentDescriptor = ComponentDescriptor.FAMILY_FORM;
    this.selectPersonTransferService.person = this.person;
    this.selectPersonTransferService.personType = personType;
    this.selectPersonTransferService.familyClone = this.familyClone;
    this.selectPersonTransferService.personFormTemplateVersion = PersonFormTemplateVersion.PERSON_SELECT;
  }

  public deletePerson(personType: PersonType, childIndex: number): void {
    if (personType === PersonType.HUSBAND) {
      this.familyClone.husband = null;
    } else if (personType === PersonType.WIFE) {
      this.familyClone.wife = null;
    } else if (personType === PersonType.CHILD) {
      this.familyClone.children.splice(childIndex, 1);
    }
  }

  public cancelChanges(): void {
    this.familyClone = this.cloneFamily(this.family);
  }

  private getFamilyPersons(family: Family): Array<Person> {
    const persons: Array<Person> = [];
    if (family.husband) {
      persons.push(family.husband);
    }
    if (family.wife) {
      persons.push(family.wife);
    }
    if (family.children && family.children.length > 0) {
      persons.push(...family.children);
    }
    return persons;
  }

  private familyValid(family: Family): boolean {
    if (this.getCompleteChildrenAmount() > 0) return true;
    if (family.husband) return true;
    if (family.wife) return true;
    return false;
  }

  public addChildTemplate(): void {
    this.person = new Person();
    this.familyClone.children.push(this.person)
  }

  public checkChild(index: number): Boolean {
    return Object.keys(this.familyClone.children[index]).length > 0
  }

  public getCompleteChildrenAmount(): number {
    let completeChildrenAmount = 0;
    if (this.familyClone.children) {
      this.familyClone.children.forEach(child => {
        if (Object.keys(child).length > 0) completeChildrenAmount++;
      })
    }

    return completeChildrenAmount;
  }

  public isBtnAddChildTemplateDisabled(): boolean {
    return (this.familyClone.children) && (this.getCompleteChildrenAmount() < this.familyClone.children.length)
  }

  public findFamily(familyId: number): void {
    this.dataProvider.findFamily(Number(familyId)).subscribe(family => {
        this.family = family;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public cloneFamily(family: Family): Family {
    return JSON.parse(JSON.stringify(family));
  }

  public exitFamilyEditor() {
    this.selectPersonTransferService.componentDescriptor = null;
  }
}

