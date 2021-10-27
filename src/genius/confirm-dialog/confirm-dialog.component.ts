import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  @Output() confirmAction = new EventEmitter<boolean>();

  returnConfirmAction(action: boolean) {
    return this.confirmAction.emit(action);
  }
}
