import {Component, OnDestroy, OnInit} from '@angular/core';
import {Family} from '../../../model/family';
import {DataProvider} from '../../services/data-provider';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss']
})
export class FamiliesPageComponent implements OnInit, OnDestroy{

  private dataLoadSubscription: Subscription;
  public families: Array<Family>;
  public familyId: number;
  public confirmDialogVisiable: boolean;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService) {
    this.loadFamilies();
  }

  ngOnInit() {
    this.dataLoadSubscription = this.dataLoad.families$.subscribe(() => this.loadFamilies());
  }

  ngOnDestroy() {
    this.dataLoadSubscription.unsubscribe();
  }

  public showConfirm(family: Family): void {
    this.familyId = family.id;
    this.confirmDialogVisiable = true;
  }

  public confirmActionHandler(confirmAction: ConfirmAction): void {
    if (confirmAction === ConfirmAction.OK) {
      this.dataProvider.deleteFamily(this.familyId)
        .subscribe(() => {
            this.loadFamilies();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    }
    this.confirmDialogVisiable = false;
  }

  public loadFamilies(): void {
    this.dataProvider.getFamilies().subscribe(families => {
        this.families = families;
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

}
