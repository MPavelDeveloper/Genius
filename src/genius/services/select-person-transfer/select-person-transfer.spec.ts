import {ComponentDescriptor, SelectPersonTransferService} from './select-person-transfer.service';
import {Person, Sex} from '../../../model/person';
import {PersonType} from '../../family.components/family-form/family-form.component';
import {Family} from '../../../model/family';
import {PersonFormTemplateVersion} from '../../person.components/person-form/person-form.component';

describe('FamilyPersonService', () => {
  let service: SelectPersonTransferService;

  beforeEach(() => {
    service = new SelectPersonTransferService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be the same', () => {
    const componentDescriptor: ComponentDescriptor = ComponentDescriptor.FAMILY_FORM;
    const personFormTemplateVersion: PersonFormTemplateVersion = PersonFormTemplateVersion.PERSON_EDIT;
    const personType: PersonType = PersonType.HUSBAND;
    const person: Person = {
      firstName: 'John',
      sex: Sex.MALE,
    };
    const family: Family = {
      id: 200
    };
    const familyId = 300;
    const currentChildIndex = 3;
    service.componentDescriptor = componentDescriptor;
    service.personFormTemplateVersion = personFormTemplateVersion;
    service.personType = personType;
    service.person = person;
    service.family = family;
    service.familyId = familyId;
    service.currentChildIndex = currentChildIndex;

    expect(service.componentDescriptor).toBe(componentDescriptor);
    expect(service.personFormTemplateVersion).toBe(personFormTemplateVersion);
    expect(service.personType).toBe(personType);
    expect(service.person).toEqual(person);
    expect(service.family).toEqual(family);
    expect(service.currentChildIndex).toBe(currentChildIndex);
  });

})
