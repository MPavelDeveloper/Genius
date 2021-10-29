import {Component} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {Family} from '../../../model/family';
import {Person, Sex} from '../../../model/person';
import {PersonFormTemplateVersion} from '../../person.components/person-form/person-form.component';
import {DataProvider} from '../../services/data-provider';

export enum FormType {
  FATHER = 'father',
  MOTHER = 'mother',
  CHILD = 'child',
}

export enum SelectListType {
  PERSONS = 'persons',
  FAMILIES = 'families',
  NONE = 'none',
}

@Component({
  selector: 'family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.scss'],
})
export class FamilyFormComponent {

  public personComponentTemplate = PersonFormTemplateVersion;
  public personType = FormType;
  public selectListType = SelectListType;
  public sex = Sex;

  public currentSelectType: SelectListType;
  public interfaceSelectPersonHint: Boolean;
  public persons: Array<Person>;
  public currentPerson: Person;
  public currentPersonType: FormType;
  public families: Array<Family>;
  public family: Family;
  public currentChildIndex: number;
  public personDialogVisible: boolean;

  constructor(private dataProvider: DataProvider) {
    this.currentSelectType = SelectListType.NONE;
    this.interfaceSelectPersonHint = false;
    this.currentPerson = new Person();
    this.currentPersonType = null;
    this.family = new Family();
    this.currentChildIndex = null;
  }

  private createNewParent(personType: FormType): void {
    if (this.personDialogVisible) {
      this.currentPerson = new Person();
      this.personDialogVisible = false;
    }
    this.currentPerson.sex = personType === FormType.FATHER ? Sex.MALE : Sex.FEMALE;
    this.currentPersonType = personType;
    this.personDialogVisible = true;
  }

  private createNewChild(index: number): void {
    this.currentChildIndex = index;
    this.currentPerson = this.family.children[index];
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
  }

  public selectExistParent(personType: FormType, selectType: SelectListType) {
    this.setSelectListType(selectType);
    this.createNewParent(personType);
    this.loadPersons();
  }

  public selectExistChild(index: number, selectType: SelectListType) {
    this.setSelectListType(selectType);
    this.currentChildIndex = index;
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
    this.loadPersons();
  }

  public changeParent(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.currentPerson = this.family.husband
      this.currentPersonType = personType;
      this.personDialogVisible = true;
      this.currentPerson.sex = Sex.MALE;
    } else if (personType === FormType.MOTHER) {
      this.currentPerson = this.family.wife
      this.currentPersonType = personType;
      this.personDialogVisible = true;
      this.currentPerson.sex = Sex.FEMALE;
    }
  }

  public changeChild(index: number) {
    this.currentChildIndex = index;
    this.currentPerson = this.family.children[index];
    this.personDialogVisible = true;
    this.currentPersonType = FormType.CHILD;
  }

  public deleteParent(personType: FormType): void {
    if (personType === FormType.FATHER) {
      this.family.husband = null;
      this.personDialogVisible = false;
    } else if (personType === FormType.MOTHER) {
      this.family.wife = null;
      this.personDialogVisible = false;
    }
    this.loadPersons();
    this.loadFamilies();
  }

  public deleteChild(index: number): void {
    this.family.children.splice(index, 1);
    if (this.family.children.length === 0) this.personDialogVisible = false;
  }

  public saveFamily(): void {
    if (this.familyValid(this.family)) {
      let saveTasks: Array<Observable<Object>> = this.getFamilyPersons(this.family)
      .map(person => {
        if (person.id) {
          return this.dataProvider.changePerson(person);
        } else {
          return this.dataProvider.addNewPerson(person);
        }
      })

      forkJoin(saveTasks).subscribe(() => {
        if (this.family.id) {
          this.dataProvider.changeFamily(this.family).subscribe(() => {
              this.loadPersons();
              this.family = new Family();
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        } else {
          this.dataProvider.addNewFamily(this.family).subscribe(() => {
              this.loadPersons();
              this.loadFamilies();
              this.family = new Family();
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            });
        }
      });
    }
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
    if (this.getCompleteChildrenAmount() > 0) {
      return true;
    }
    if (family.husband) return true;
    if (family.wife) return true;
    console.log('check false');
    return false;
  }

  public addPersonInFamily(person: Person): void {
    if (this.currentPersonType === FormType.CHILD && person === null) {
      this.family.children[this.currentChildIndex] = new Person();
    }

    if (person && Object.keys(person).length > 0) {
      if (this.currentPersonType === FormType.FATHER) {
        this.family.husband = person;
      } else if (this.currentPersonType === FormType.MOTHER) {
        this.family.wife = person;
      }
    }

    this.currentPerson = new Person()
    this.personDialogVisible = false;
  }

  public addChildTemplate(): void {
    this.currentPerson = new Person();
    this.addChild(this.currentPerson);
  }

  private addChild(person: Person): void {
    this.family.children.push(person)
  }

  public checkChild(index: number): Boolean {
    return Object.keys(this.family.children[index]).length > 0
  }

  private getCompleteChildrenAmount(): number {
    let amount = 0;
    if (this.family.children) {
      this.family.children.forEach(child => {
        if (Object.keys(child).length > 0) amount++;
      })
    }

    return amount;
  }

  public loadFamilies(): void {
    this.dataProvider.getFamilies().subscribe(families => {
        this.families = families;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error?.status}\n Error message: ${errorResponse.error?.message}\n Error path: ${errorResponse.error?.path}\n`);
      });
  }

  public loadPersons(): void {
    this.dataProvider.getPersons().subscribe(persons => {
        this.persons = persons;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public setSelectListType(type: SelectListType): void {
    this.currentSelectType = type;
  }

  public setCurrentPerson(person: Person): void {
    if (this.personDialogVisible) {
      if (person.sex === Sex.MALE && this.currentPersonType === FormType.FATHER ||
        person.sex === Sex.FEMALE && this.currentPersonType === FormType.MOTHER) {
        this.currentPerson = person;
      } else if (this.currentPersonType === FormType.CHILD) {
        this.currentPerson = person;
        this.family.children[this.currentChildIndex] = person;
      }
    } else {
      this.interfaceSelectPersonHint = true;
      setTimeout(() => this.interfaceSelectPersonHint = false, 300);
    }
  }

  public setCurrentFamily(family: Family): void {
    this.family = family;
  }

  public cleanForm(): void {
    this.interfaceSelectPersonHint = false;
    this.currentPerson = new Person();
    this.family = new Family();
    this.currentChildIndex = null;
    this.personDialogVisible = false;
  }

  public isAddChildDisabled(): boolean {
    return this.family.children && this.getCompleteChildrenAmount() + 1 === this.family.children.length
  }
}

