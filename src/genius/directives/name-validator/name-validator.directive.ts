import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';

@Directive({
  selector: '[nameValidatorDirective]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NameValidatorDirective, multi: true }]
})
export class NameValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const nameValid = /^[a-zA-Z]+$/.test(control.value);
    if (nameValid) {
      return null
    } else {
      return { 'nameValid': false}
    }
  }

}
