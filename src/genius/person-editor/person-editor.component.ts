import {Component} from '@angular/core';
import {PersonFormTemplateVersion} from "../person-form/person-form.component";

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.scss']
})
export class PersonEditorComponent {

  personComponentTemplate;

  constructor() {
    this.personComponentTemplate = PersonFormTemplateVersion;
  }

}
