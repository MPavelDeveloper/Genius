import {NameValidatorDirective} from './name-validator.directive';
import {FormControl} from '@angular/forms';
import {random} from '../../utils/utils';

describe('NameValidatorDirective', () => {
  let badEmailData: Array<String> = [
    '1Name',
    'Name@',
    'Зчзвы',
    'Name!-_',
    'Name Name',
  ];
  let correctEmailData: Array<String> = [
    'Nikolai',
    'Viktor',
    'Sergey',
  ];

  let directive: NameValidatorDirective;
  let formControl: FormControl;

  beforeEach(() => {
    directive = new NameValidatorDirective();
    formControl = new FormControl();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should be true; correct email data', () => {
    formControl.setValue(correctEmailData[random(correctEmailData.length - 1, 0)]);
    expect(directive.validate(formControl)).toBeNull();
  });

  it('should be false; bad email data', () => {
    formControl.setValue(badEmailData[random(badEmailData.length - 1, 0)]);
    expect(directive.validate(formControl)).toEqual({'nameValid': false});
  });
});
