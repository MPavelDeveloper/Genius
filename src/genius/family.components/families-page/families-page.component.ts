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
  private dataProvider;
  private dataLoad;
  private familyTree;
  private changeDetection;

  constructor(dataProvider: DataProvider, dataLoad: DataLoadService, familyTree: FamilyTreeService, changeDetection: ChangeDetectorRef) {
    this.dataProvider = dataProvider;
    this.dataLoad = dataLoad;
    this.familyTree = familyTree;
    this.changeDetection = changeDetection;
    this.loadFamilyTree();
  }

  ngOnInit() {
    this.dataLoadSubscription = this.dataLoad.families$.subscribe(() => {
      this.loadFamilyTree();
    });
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
    this.familyTree.createFamilyTree().subscribe(() => {
        this.familyTreeGrid = this.createFamilyTreeGrid(this.familyTree.getFamilyTreeLevels());
        console.log(this.familyTreeGrid);
        this.changeDetection.detectChanges();
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public createFamilyTreeGrid(familyTreeLevels: Array<Array<Node>>): Array<Array<Array<Node>>> {
    let familyTreeGrid: Array<Array<Array<Node>>> = [];
    let rootFamilyNode: Array<Array<Node>> = [familyTreeLevels[0]]
    let nodeChildMaxNumber = 0;

    familyTreeGrid.push(rootFamilyNode);
    for (let currentFamilyNodeSet of familyTreeGrid) {
      let currentRowNodes = this.getCurrentRowNodes(currentFamilyNodeSet);
      nodeChildMaxNumber = this.getChildNodeMaxNumber(currentRowNodes);
      let nextFamilyGridRow = this.createNewFamilyTreeGridRow(currentRowNodes, nodeChildMaxNumber);
      if (this.checkNextFamilyGridRow(nextFamilyGridRow)) {
        familyTreeGrid.push(nextFamilyGridRow);
      } else {
        break
      }
    }
    return familyTreeGrid;
  }

  private getChildNodeMaxNumber(nodes: Array<Node>): number {
    let maxChildNodeNumber = 0;
    // [[node, node], [node]]
    nodes.forEach(node => {
      if (node.data !== null) {
        if (node.children.length > maxChildNodeNumber) {
          maxChildNodeNumber = node.children.length;
        }
      }
    });
    return maxChildNodeNumber;
  }

  private getCurrentRowNodes(currentFamilyNodeSet: Array<Array<Node>>): Array<Node> {
    let currentRowNodes: Array<Node> = [];
    currentFamilyNodeSet.forEach(node => currentRowNodes = currentRowNodes.concat(node));
    return currentRowNodes;
  }

  public createNewFamilyTreeGridRow(currentRowNodes: Array<Node>, nodeChildMaxNumber: number): Array<Array<Node>> {
    let familyTreeGridRow: Array<Array<Node>> = [];
    currentRowNodes.forEach(node => {
      let childNodes: Array<Node> = [];
      if (node.data !== null) {
        childNodes = node.children;
      }
      while (childNodes.length < nodeChildMaxNumber) {
        childNodes.push(new Node(null));
      }
      familyTreeGridRow.push(childNodes);
    });
    return familyTreeGridRow;
  }

  private checkNextFamilyGridRow(nextFamilyGridRow: Array<Array<Node>>): boolean {
    let nodes = this.getCurrentRowNodes(nextFamilyGridRow);
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].data !== null) return true
    }
    return false;
  }

  public setFamilyStyle(family: Node): string {
    if (family.data) {
      return 'family';
    }
    return 'family-none';
  }

  public setArrowStyle(parentAmount: number, childNumber: number, nodeIndex: number,): string {
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
