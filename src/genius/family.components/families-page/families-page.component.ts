import {Component, OnInit} from '@angular/core';
import {Family} from '../../../model/family';
import {DataProvider} from '../../services/data-provider';
import {DataLoadService} from '../../services/data-load/data-load.service';

@Component({
  selector: 'app-families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss']
})
export class FamiliesPageComponent implements OnInit {

  public families: Array<Family>;
  public familyId: number;
  public confirmDialogVisiable: boolean;

  constructor(private dataProvider: DataProvider, private dataLoad: DataLoadService) {
    this.loadFamilies()
  }

  ngOnInit(): void {
    this.dataLoad.families$.subscribe(() => this.loadFamilies())
  }

  public deleteFamily(deleteFamilyFlag: boolean): void {
    if (deleteFamilyFlag) {
      this.dataProvider.deleteFamily(this.familyId).subscribe(() => {
          this.dataProvider.getFamilies().subscribe(families => {
              this.families = families
            },
            (errorResponse) => {
              console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
            })
        },
        (errorResponse) => {
          console.error(`Error status: ${errorResponse.error.status}\n Error message: ${errorResponse.error.message}\n Error path: ${errorResponse.error.path}\n`);
        });
    }
    this.confirmDialogVisiable = false;
  }

  public showConfirm(familyId: number): void {
    this.familyId = familyId;
    this.confirmDialogVisiable = true;
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
