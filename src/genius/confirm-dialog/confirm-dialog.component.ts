import {Component, OnInit, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

export enum ConfirmAction {
  OK = 'ok',
  CANCEL = 'cancel',
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Output() confirmAction = new EventEmitter<ConfirmAction>();
  confirmActionType;

  constructor() {
    this.confirmActionType = ConfirmAction;
  }

  returnConfirmAction(confirmAction: ConfirmAction) {
    return this.confirmAction.emit(confirmAction);
  }
}
