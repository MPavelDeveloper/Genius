import {Component, ViewChild} from "@angular/core";
import {PersonFormTemplateVersion} from "../person-form/person-form.component";
import {Person} from "../../model/person";
import {DataProvider} from "../services/data-provider";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent {

  public currentPerson: Person;
  public personDialogVisible: Boolean;
  public personComponentTemplate;
  public reloadPersons: Boolean;
  public createNewPerson: Boolean;

  constructor(private dataProvider: DataProvider) {
    this.personDialogVisible = false;
    this.personComponentTemplate = PersonFormTemplateVersion;
  }

  setCurrentPerson(person: Person): void {
    this.createNewPerson = false;
    this.currentPerson = person;
    this.personDialogVisible = true;
  }

  addPerson(person: Person): void {
    if (this.isPersonValid(person)) {
      this.dataProvider.addNewPerson(person)
      this.personDialogVisible = false;
      this.reloadPersons = true;
      setTimeout(() => this.reloadPersons = false, 0)
    } else {
      this.personDialogVisible = false;
    }
  }

  changePerson(person: Person): void {
    this.dataProvider.changePerson(person);
    this.personDialogVisible = false;
    this.reloadPersons = true;
    setTimeout(() => this.reloadPersons = false, 0)
  }

  deletePerson(person: Person): void {
    this.dataProvider.deletePerson(person.id)
    this.personDialogVisible = false;
    this.reloadPersons = true;
    setTimeout(() => this.reloadPersons = false, 0)
  }

  isPersonValid(person: Person): Boolean {
    if(person) {
      let values = Object.values(person);
      if (values.length > 0) {
        return true
      }
    }
    return false
  }

  createPerson(person: Person): void {
    this.currentPerson = person;
    this.createNewPerson = true;
    this.personDialogVisible = true;
  }


}


