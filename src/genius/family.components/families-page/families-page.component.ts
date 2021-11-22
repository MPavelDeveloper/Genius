import {Component, OnDestroy, OnInit} from '@angular/core';
import {Family} from '../../../model/family';
import {DataProvider} from '../../services/data-provider';
import {DataLoadService} from '../../services/data-load/data-load.service';
import {ConfirmAction} from '../../confirm-dialog/confirm-dialog.component';
import {Subscription} from 'rxjs';
import {FamilyTreeService} from '../../services/family-tree/family-tree.service';
import {Node} from '../../services/family-tree/family-tree.service';

@Component({
  selector: 'families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss']
})
export class FamiliesPageComponent implements OnInit, OnDestroy {

  private dataLoadSubscription: Subscription;
  public families: Array<Family>;
  public familyId: number;
  public confirmDialogVisiable: boolean;
  public familyGenius: Array<Array<Node>>;
  public familyTreeBootstrap: Array<Array<Node>>;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService, private familyTree: FamilyTreeService) {
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
    this.confirmDialogVisiable = true;
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
    this.confirmDialogVisiable = false;
  }

  public loadFamilyTree(): void {
    this.familyTree.createFamilyTree().subscribe(() => {
        this.familyGenius = this.createFamilyTreeBootstrap(this.familyTree.getFamilyTreeLevels());
      },
      (errorResponse) => {
        console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
      });
  }

  public createFamilyTreeBootstrap(familyTreeLevels: Array<Array<Node>>): Array<Array<Node>> {
    let familyTreeBootstrap: Array<Array<Node>> = [];
    familyTreeBootstrap.push(familyTreeLevels[0]);
    for (let currentFamilyTreeLevel of familyTreeLevels) {
      let maxNumberChildNodes = this.getMaxNumberChildNodes(currentFamilyTreeLevel);
      familyTreeBootstrap.push(this.createNewFamilyTreeBootstrapLevel(currentFamilyTreeLevel, maxNumberChildNodes));
    }
    return familyTreeBootstrap;
  }

  public getMaxNumberChildNodes(familyTreeLevel: Array<Node>): number {
    let maxChildrenNodes = 0;
    familyTreeLevel.forEach(node => {
      if (node.children.length > maxChildrenNodes) {
        maxChildrenNodes = node.children.length;
      }
    });

    return maxChildrenNodes;
  }

  public createNewFamilyTreeBootstrapLevel(familyTreeLevel: Array<Node>, maxChildrenNodes: number): Array<Node> {
    let bootstrapLevel: Array<Node> = [];
    familyTreeLevel.forEach(node => {
      let nodeChildren: Array<Node> = [].concat(node.children);
      while (nodeChildren.length < maxChildrenNodes) {
        nodeChildren.push(new Node(null));
      }
      bootstrapLevel = bootstrapLevel.concat(nodeChildren);
    })
    return bootstrapLevel;
  }

}
