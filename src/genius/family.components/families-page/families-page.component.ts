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
export class FamiliesPageComponent implements OnInit, OnDestroy{

  private dataLoadSubscription: Subscription;
  public families: Array<Family>;
  public familyId: number;
  public confirmDialogVisible: boolean;
  public familyGenius: Array<Array<Node>>;
  public familyTreeBootstrap: Array<Array<Array<Node>>>;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService, private familyTree: FamilyTreeService, private changeDetection: ChangeDetectorRef) {
    this.loadFamilyTree();
  }

  ngOnInit() {
    this.dataLoadSubscription = this.dataLoad.families$.subscribe(() => {
      this.familyGenius = [];
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
        this.familyTreeBootstrap = this.createFamilyBootstrap(this.familyTree.getFamilyTreeLevels());
        this.changeDetection.detectChanges();
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public createFamilyBootstrap(familyTreeLevels: Array<Array<Node>>): Array<Array<Array<Node>>> {
    let familyTreeBootstrap: Array<Array<Array<Node>>> = [];
    let nodeAmountParentLevel = 0;
    let nodeAmountChildCurrentLevel = 0;
    let gridCounter = 0;

    // push #root
    // VVV
    familyTreeBootstrap.push([familyTreeLevels[0]]);
    for (let currentRowIndex = 0; currentRowIndex < familyTreeBootstrap.length; currentRowIndex++) {
      nodeAmountChildCurrentLevel = 0;

      // [[node], [node]] nodeSets
      nodeAmountParentLevel = familyTreeBootstrap[currentRowIndex].length;


      let parentNodesAmount = 0;
      let childNodesAmount = 0;

      familyTreeBootstrap[currentRowIndex].forEach((nodes: Array<Node>) => {
        parentNodesAmount ++;
        nodes.forEach(node => {
          if(node !== null) {
            let currentChildAmount = node.children.length;
            if(currentChildAmount > childNodesAmount) {
              childNodesAmount = currentChildAmount;
            }
          }
        });
      });


      if (parentNodesAmount > nodeAmountParentLevel) {
        nodeAmountParentLevel = parentNodesAmount;
      }

      if (childNodesAmount > nodeAmountChildCurrentLevel) {
        nodeAmountChildCurrentLevel = childNodesAmount
      }
      childNodesAmount = 0;
      // console.log('parents: ', parentNodesAmount);
      // console.log('chidren: ', childNodesAmount);

      if (nodeAmountParentLevel > nodeAmountChildCurrentLevel) {
        gridCounter = nodeAmountParentLevel
      } else {
        gridCounter = nodeAmountChildCurrentLevel;
      }

      // console.log('gridCounter: ', gridCounter)

      let currentLevelNodes: Array<Node> = [];

      // [[node], [node]]
      familyTreeBootstrap[currentRowIndex].forEach((nodes: Array<Node>) => currentLevelNodes = currentLevelNodes.concat(nodes));
      // console.log(currentLevelNodes)


      familyTreeBootstrap.push(this.createNewFamilyTreeBootstrapLevel(currentLevelNodes, gridCounter));
      if(currentRowIndex === familyTreeLevels.length) break
    }
    return familyTreeBootstrap;
  }

  public createNewFamilyTreeBootstrapLevel(currentLevelNodes: Array<Node>, maxChildrenNodes: number): Array<Array<Node>> {
    let familyTreeBootstrapRow: Array<Array<Node>> = [];
    currentLevelNodes.forEach(node => {


      if (node !== null) {
        let nodeChildren: Array<Node> = [].concat(node.children);
        while (nodeChildren.length < maxChildrenNodes) {
          nodeChildren.push(null);
        }
        familyTreeBootstrapRow.push(nodeChildren);
      } else {
        let nodeChildren: Array<Node> = []
        while (nodeChildren.length < maxChildrenNodes) {
          nodeChildren.push(null);
        }
        familyTreeBootstrapRow.push([null]);
      }

    });

    return familyTreeBootstrapRow;
  }

  public compareIndexAndOrder(index: number, order: number): boolean {
    return index === order;
  }

}
