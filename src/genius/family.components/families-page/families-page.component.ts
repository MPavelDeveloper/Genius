import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Family} from '../../../model/family';
import {DataProvider} from '../../services/data-provider';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';
import {FamilyTreeService, Node} from '../../services/family-tree/family-tree.service';

@Component({
  selector: 'families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamiliesPageComponent implements OnInit, OnDestroy {
  private dataLoadSubscription: Subscription;
  public families: Array<Family>;
  public familyId: number;
  public confirmDialogVisible: boolean;
  public familyTreeGrid: Array<Array<Array<Node>>>;
  private dataProvider: DataProvider;
  private dataLoad: DataLoadService;
  private familyTreeService: FamilyTreeService;
  private changeDetection: ChangeDetectorRef;

  constructor(dataProvider: DataProvider, dataLoad: DataLoadService, familyTreeService: FamilyTreeService, changeDetection: ChangeDetectorRef) {
    this.dataProvider = dataProvider;
    this.dataLoad = dataLoad;
    this.familyTreeService = familyTreeService;
    this.changeDetection = changeDetection;
  }

  ngOnInit() {
    this.dataLoadSubscription = this.dataLoad.families$.subscribe(() => this.loadFamilyTree());
    this.dataLoad.families$.next();
  }

  ngOnDestroy() {
    this.dataLoadSubscription.unsubscribe();
  }

  public showConfirm(family: Family): void {
    this.familyId = family.id;
    this.confirmDialogVisible = true;
  }

  public confirmActionHandler(confirmAction: ConfirmAction): void {
    if (confirmAction === ConfirmAction.OK) {
      this.dataProvider.deleteFamily(this.familyId)
        .subscribe(() => {
            this.loadFamilyTree();
          },
          (errorResponse) => {
            console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
          });
    }
    this.confirmDialogVisible = false;
  }

  public loadFamilyTree(): void {
    this.familyTreeService.createFamilyTree().subscribe(() => {
        this.familyTreeGrid = this.familyTreeService.getFamilyTreeGrid();
        this.changeDetection.detectChanges();
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public getFamilyStyle(family: Node): string {
    if (family.data) {
      return 'family';
    }
    return 'family-none';
  }

  public getArrowStyle(parentAmount: number, childNumber: number, nodeIndex: number,): string {
    if (parentAmount === 1) {
      switch (childNumber) {
        case 1:
          return 'arrow-center';
        case 2:
          if (nodeIndex === 0) return 'arrow-big-left';
          if (nodeIndex === 1) return 'arrow-big-right';
      }
    } else if (parentAmount === 2) {
      switch (childNumber) {
        case 1:
          return 'arrow-center';
        case 2:
          if (nodeIndex === 0) return 'arrow-left_x4';
          if (nodeIndex === 1) return 'arrow-right_x4';
          break;
        case 3:
          if (nodeIndex === 0) return 'arrow-left_x4';
          if (nodeIndex === 1) return 'arrow-center';
          if (nodeIndex === 2) return 'arrow-right_x4';
      }
    }

    switch (childNumber) {
      case 1:
        return 'arrow-center';
      case 2:
        if (nodeIndex === 0) return 'arrow-left_xN';
        if (nodeIndex === 1) return 'arrow-right_xN';
        break;
      case 3:
        if (nodeIndex === 0) return 'arrow-left_x4';
        if (nodeIndex === 1) return 'arrow-center';
        if (nodeIndex === 2) return 'arrow-right_x4';
    }
    return undefined
  }

}
