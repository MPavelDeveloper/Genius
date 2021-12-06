import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamilyComponent } from './family.component';
import {testRootFamily} from '../../../json';
import {By} from '@angular/platform-browser';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('FamilyComponent', () => {
  let component: FamilyComponent;
  let fixture: ComponentFixture<FamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyComponent],
      schemas:[NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyComponent);
    component = fixture.componentInstance;
    component.family = testRootFamily;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('@Output; should be family, returnFamily()', () => {
    let event = spyOn(component.returnedFamily, 'emit');
    component.returnFamily();
    expect(event).toHaveBeenCalledWith(testRootFamily);
  });

  it('@Input; should be the same in HTML', () => {
    let title = fixture.debugElement.query(By.css('.person-title'));
    let persons = fixture.nativeElement.querySelectorAll('.person');
    expect(title.nativeElement.innerText).toBe(testRootFamily.husband.lastName);
    expect(persons.length).toBe(3);
  });

});
