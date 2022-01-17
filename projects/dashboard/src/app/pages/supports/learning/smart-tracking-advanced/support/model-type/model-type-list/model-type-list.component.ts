import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkService } from '../../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../../vvtk-core/services/shared.service';
import { SupportTypeManage } from '../../../../../../../vvtk-core/classes/support-smart-tracking-advanced';
import { CommonSelectOption } from '../../../../../../../vvtk-core/interface/common-model';
import {
  DeleteConfirmComponent,
  DeleteConfirmResult
} from '../../../../../../../shared/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'vvtk-model-type-list',
  templateUrl: './model-type-list.component.html',
  styleUrls: ['./model-type-list.component.scss']
})
export class ModelTypeListComponent implements OnInit {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  data: SupportTypeManage[] = [];

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
      '/supports/learning/smart-tracking-advanced/support/type/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/learning/smart-tracking-advanced/support/type/0'
    );
    // this.pageContentIsEditable = this.sharedService.pageIsEditable;
    // this.pageContentIsViewable = this.sharedService.pageIsEditable;
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Products/SmartTrackingAdvanced/Support/Type/ManageList`,
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
          optionText: x.typeName
        }),
        placeholder: 'Model Type'
      }
    });
    dialogRef.afterClosed().subscribe((result: DeleteConfirmResult) => {
      if (result && result.value) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Products/SmartTrackingAdvanced/Support/Type/${id}/${result.value}`,
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
        path: `api/Products/SmartTrackingAdvanced/Support/Type/DisplayOrder`,
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
