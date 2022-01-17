import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { SupportTypeManage } from '../../../../../../../vvtk-core/classes/product-vivocloud';
import { CommonSelectOption } from '../../../../../../../vvtk-core/interface/common-model';
import {
  DeleteConfirmComponent,
  DeleteConfirmResult
} from '../../../../../../../shared/components/delete-confirm/delete-confirm.component';
import { WebinarsSeriesManage } from 'projects/dashboard/src/app/vvtk-core/classes/insider-webinars';

@Component({
  selector: 'vvtk-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  data: WebinarsSeriesManage[] = [];

  isLoading = true;
  lockDelete = false;

  groupOptions: SortablejsOptions = {
    group: 'group1',
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchSequence();
    }
  };

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/learning/vwa/insider-webinars-list/series/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/learning/vwa/insider-webinars-list/series/0'
    );
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Series/ManageList`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  delete(id: number, series: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      disableClose: false,
      data: {
        title: `Delete ${series}`,
        message: `Delete this Series${series}?`
      }
    });
    dialogRef.afterClosed().subscribe((result: DeleteConfirmResult) => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Supports/Learning/InsiderWebinars/List/Series/${id}`,
            disableLanguage: true
          },
          {
            next: resp => {
              this.getData();
            },
            finally: () => {
              this.isLoading = false;
            }
          }
        );
      }
      this.lockDelete = false;
    });
  }

  patchSequence() {
    this.isLoading = true;
    const sequenceData: SupportTypeManage[] = [];
    let sequence = 1;
    for (let i = 0; i < this.data.length; i++) {
      sequenceData.push({
        id: this.data[i].id,
        displayOrder: sequence
      });
      sequence++;
    }

    this.vvtkService.patch(
      {
        path: `api/Supports/Learning/InsiderWebinars/List/Series/DisplayOrder`,
        disableLanguage: true
      },
      sequenceData,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

}
