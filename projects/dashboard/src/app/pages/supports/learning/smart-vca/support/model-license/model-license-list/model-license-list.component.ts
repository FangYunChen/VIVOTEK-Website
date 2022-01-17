import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { SupportLicenseManage } from '../../../../../../../vvtk-core/classes/support-smart-vca';
import { CommonSelectOption } from '../../../../../../../vvtk-core/interface/common-model';
import {
  DeleteConfirmComponent,
  DeleteConfirmResult
} from '../../../../../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'vvtk-model-license-list',
  templateUrl: './model-license-list.component.html',
  styleUrls: ['./model-license-list.component.scss']
})
export class ModelLicenseListComponent implements OnInit {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  data: SupportLicenseManage[] = [];

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
      '/supports/learning/smart-vca/support/license/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/learning/smart-vca/support/license/0'
    );
    // this.pageContentIsEditable = this.sharedService.pageIsEditable;
    // this.pageContentIsViewable = this.sharedService.pageIsEditable;
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Products/SmartVca/Support/License/ManageList`,
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

  delete(id: number, title: string) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      disableClose: false,
      data: {
        title: `Delete ${title}`,
        options: this.data.map(x => <CommonSelectOption>{
          value: x.id,
          optionText: x.licenseName
        }),
        placeholder: 'Model Type'
      }
    });
    dialogRef.afterClosed().subscribe((result: DeleteConfirmResult) => {
      if (result && result.value) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Products/SmartVca/Support/License/${id}/${result.value}`,
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
    const sequenceData: SupportLicenseManage[] = [];
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
        path: `api/Products/SmartVca/Support/License/DisplayOrder`,
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
