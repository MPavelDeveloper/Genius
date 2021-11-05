import {Component, Input, OnInit} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {Family} from '../../../model/family';
import {Person} from '../../../model/person';
import {PersonFormTemplateVersion} from '../../person.components/person-form/person-form.component';
import {DataProvider} from '../../services/data-provider';
import {ActivatedRoute} from '@angular/router';
import {PersonTemplateType} from '../../person.components/person/person.component';
import {
  ComponentDescriptor,
  SelectPersonTransferService
} from '../../services/select-person-transfer/select-person-transfer.service';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {
  LifeEventActionDescriptor,
  LifeEventTemplateAction,
  LifeEventTemplateVersion
} from '../../event.components/life-event/life-event.component';
import {
  LifeEventFormActionDescriptor,
  LifeEventFormTemplateAction,
  LifeEventFormType
} from '../../event.components/life-event-form/life-event-form.component';
import {LifeEvent, LifeEventPrefix, LifeEventType} from '../../../model/life-event';
import {deepClone} from '../../utils/utils';

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
  public lifeEventClone: LifeEvent;
  public currentChildIndex: number;
  public currentFamilyFormPath: FamilyFormPath;
  public lifeEventFormType: LifeEventFormType;
  public lifeEventFormDialogVisiable: boolean;
  public familyFormTemplateVersion;
  public personTemplateVersion;
  public personType;
  public familyFormPath;
  public lifeEventTemplateVersion;


  constructor(private dataProvider: DataProvider,
              private activateRoute: ActivatedRoute,
              private selectPersonTransferService: SelectPersonTransferService,
              private dataLoadService: DataLoadService) {
    this.person = new Person();
    this.family = new Family();

    this.familyFormTemplateVersion = FamilyFormTemplateVersion;
    this.personTemplateVersion = PersonTemplateType;
    this.personType = PersonType;
    this.familyFormPath = FamilyFormPath;
    this.lifeEventTemplateVersion = LifeEventTemplateVersion;
  }

  public ngOnInit() {
    if (this.activateRoute.snapshot && this.activateRoute.snapshot.routeConfig) {
      let path = <FamilyFormPath>this.activateRoute.snapshot.routeConfig.path;
      this.currentFamilyFormPath = path;
      if (path === FamilyFormPath.CREATE) {
        if (this.selectPersonTransferService.person) {
          this.familyClone = this.selectPersonTransferService.family;
          this.templateVersion = FamilyFormTemplateVersion.FAMILY_EDITOR;
          this.selectPersonTransferService.componentDescriptor = ComponentDescriptor.FAMILY_FORM;
          this.addSelectPersonInFamily(this.selectPersonTransferService.personType, this.selectPersonTransferService.person, this.selectPersonTransferService.currentChildIndex);
        } else {
          this.family = new Family();
          this.familyClone = this.family;
          this.templateVersion = FamilyFormTemplateVersion.FAMILY_EDITOR;
        }
      } else if (path === FamilyFormPath.VIEW) {
        this.findFamily(Number(this.activateRoute.snapshot.params.id))
        this.templateVersion = FamilyFormTemplateVersion.FAMILY_VIEW;
      } else if (path === FamilyFormPath.EDIT && this.selectPersonTransferService.componentDescriptor === ComponentDescriptor.PERSON_FORM) {
        this.findFamily(this.selectPersonTransferService.familyId)
        this.familyClone = this.selectPersonTransferService.family
        this.templateVersion = FamilyFormTemplateVersion.FAMILY_EDITOR;
        this.selectPersonTransferService.componentDescriptor = ComponentDescriptor.FAMILY_FORM;
        this.addSelectPersonInFamily(this.selectPersonTransferService.personType, this.selectPersonTransferService.person, this.selectPersonTransferService.currentChildIndex);
      } else if (path === FamilyFormPath.EDIT) {
        this.dataProvider.findFamily(Number(this.activateRoute.snapshot.params.id)).subscribe(family => {
            this.family = family;
            this.familyClone = deepClone(family);
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
              this.selectPersonTransferService.person = null;
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        } else {
          this.dataProvider.addNewFamily(this.familyClone).subscribe(() => {
              this.dataLoadService.reloadFamilies(true)
              this.selectPersonTransferService.person = null;
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        }
      });
    }
  }

  public findFamily(familyId: number): void {
    this.dataProvider.findFamily(Number(familyId)).subscribe(family => {
        this.family = family;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
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
      if (this.familyClone.husband) {
        this.person = this.familyClone.husband;
      }else{
        this.person = new Person();
      }
    } else if (personType === PersonType.WIFE) {
      if (this.familyClone.wife){
        this.person = this.familyClone.wife;
      } else {
        this.person = new Person();
      }
    } else if (personType === PersonType.CHILD) {
      if(this.familyClone.children[childIndex]) {
        this.person = this.familyClone.children[childIndex]
      } else {
        this.person = new Person();
      }
      this.currentChildIndex = childIndex;
      this.selectPersonTransferService.currentChildIndex = this.currentChildIndex;
    }
    this.selectPersonTransferService.componentDescriptor = ComponentDescriptor.FAMILY_FORM;
    this.selectPersonTransferService.person = this.person;
    this.selectPersonTransferService.personType = personType;
    this.selectPersonTransferService.familyId = this.family.id
    this.selectPersonTransferService.family = this.familyClone;
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

  public addNewLifeEvent(familyId: number, lifeEvent: LifeEvent): void {
    this.dataProvider.addNewFamilyEvent(familyId, lifeEvent).subscribe(() => {
        this.reloadFamily(familyId)
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public changeLifeEvent(familyId: number, lifeEvent: LifeEvent): void {
    this.dataProvider.deleteFamilyEvent(familyId, lifeEvent).subscribe(() => {
        this.dataProvider.addNewFamilyEvent(familyId, lifeEvent).subscribe(() => {
            this.reloadFamily(familyId)
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public createLifeEvent(): void {
    this.lifeEventFormType = LifeEventFormType.NEW_EVENT;
    this.lifeEventClone = new LifeEvent()
    this.lifeEventClone.type = LifeEventType.DEFAULT;
    this.lifeEventClone.prefix = LifeEventPrefix.NONE;
    this.lifeEventFormDialogVisiable = true;
  }

  public lifeEventHandler(lifeEventActionDescriptor: LifeEventActionDescriptor): void {
    if (lifeEventActionDescriptor.action === LifeEventTemplateAction.DELETE) {
      this.dataProvider.deleteFamilyEvent(this.family.id, lifeEventActionDescriptor.lifeEvent).subscribe(() => {
          this.reloadFamily(this.family.id)
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    } else if (lifeEventActionDescriptor.action === LifeEventTemplateAction.GET) {
      this.lifeEventClone = deepClone(lifeEventActionDescriptor.lifeEvent);
      this.lifeEventFormDialogVisiable = true;
      this.lifeEventFormType = LifeEventFormType.EXIST_EVENT;
    }
  }

  public lifeEventFormHandler(lifeEventFormActionDescriptor: LifeEventFormActionDescriptor): void {
    this.lifeEventFormDialogVisiable = false;
    if (lifeEventFormActionDescriptor) {
      if (lifeEventFormActionDescriptor.action === LifeEventFormTemplateAction.CHANGE) {
        this.changeLifeEvent(this.family.id, lifeEventFormActionDescriptor.lifeEvent)
      } else if (lifeEventFormActionDescriptor.action === LifeEventFormTemplateAction.SAVE) {
        this.addNewLifeEvent(this.family.id, lifeEventFormActionDescriptor.lifeEvent)
      }
    }
  }

  public cancelChanges(): void {
    this.familyClone = deepClone(this.family);
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

  public exitFamilyEditor(): void {
    this.selectPersonTransferService.componentDescriptor = null;
    this.selectPersonTransferService = null;
  }

  private reloadFamily(familyId: number): void {
    this.dataProvider.findFamily(familyId).subscribe(family => {
        this.family = family;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      })
  }

}

