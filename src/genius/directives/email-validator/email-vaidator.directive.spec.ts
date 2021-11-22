import {EmailValidatorDirective} from './email-validator.directive';
import {random} from '../../utils/utils';
import {FormControl} from '@angular/forms';

describe('EmailVaidatorDirective', () => {
  let badEmailData: Array<String> = [
    'test',
    '1t2es3t',
    'test@',
    'test@mail',
    'test@mail..ru',
    'tes@t@mail.ru',
  ];
  let correctEmailData: Array<String> = [
    'test@mail.ru',
    't@gmail.com',
    'list@inbox.by',
  ];
  let directive: EmailValidatorDirective;
  let formControl: FormControl;

  beforeEach(() => {
    directive = new EmailValidatorDirective();
    formControl = new FormControl();
  })


  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should be true; correct email data', () => {
    formControl.setValue(correctEmailData[random(correctEmailData.length - 1, 0)]);
    expect(directive.validate(formControl)).toBeNull();
  });

  it('should be false; bad email data', () => {
    formControl.setValue(badEmailData[random(badEmailData.length - 1, 0)]);
    expect(directive.validate(formControl)).toEqual({'emailValid': false});
  });
});
