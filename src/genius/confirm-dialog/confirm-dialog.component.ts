import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

export enum ConfirmAction {
  OK = 'ok',
  CANCEL = 'cancel',
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent implements OnInit{
  @Output() confirmAction = new EventEmitter<ConfirmAction>();
  confirmActionType;

  constructor(private changeDetection: ChangeDetectorRef) {
    this.confirmActionType = ConfirmAction;
  }

  ngOnInit(): void {
    this.changeDetection.detectChanges();
  }

  ok() {
    this.confirmAction.emit(ConfirmAction.OK);
  }

  cancel() {
    this.confirmAction.emit(ConfirmAction.CANCEL);
  }


}
