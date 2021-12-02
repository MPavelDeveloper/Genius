import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import {By} from '@angular/platform-browser';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called, buttons', () => {
    spyOn(component, 'ok');
    spyOn(component, 'cancel');
    let okBtn = fixture.debugElement.query(By.css('.btn-ok'));
    let cancelBtn = fixture.debugElement.query(By.css('.btn-cancel'));
    okBtn.nativeElement.click();
    cancelBtn.nativeElement.click();
    expect(component.ok).toHaveBeenCalled();
    expect(component.cancel).toHaveBeenCalled();
  });

  it('@Output, should be emit', () => {
    let event = spyOn(component.confirmAction, 'emit');
    component.ok();
    expect(event).toHaveBeenCalled();
    component.cancel();
    expect(event).toHaveBeenCalled();
  });

});
