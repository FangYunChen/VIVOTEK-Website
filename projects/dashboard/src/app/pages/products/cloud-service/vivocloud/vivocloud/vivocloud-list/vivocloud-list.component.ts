import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { VvtkService } from '../../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../../vvtk-core/services/shared.service';
import { ConfirmComponent } from '../../../../../../shared/components/confirm/confirm.component';
import { TabTemplates } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-crowd-control-list',
  templateUrl: './vivocloud-list.component.html',
  styleUrls: ['./vivocloud-list.component.scss']
})
export class VivocloudListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;
  data: TabTemplates[] = [];

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
      '/products/cloud-service/vivocloud/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/products/cloud-service/vivocloud/0'
    );

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.getData();
      }
    );
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Product/VIVOCloud/ManageList`
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
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除：${title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Product/VIVOCloud/${id}`,
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
      } else {
      }
      this.lockDelete = false;
    });
  }

  patchSequence() {
    this.isLoading = true;
    const sequenceData: TabTemplates[] = [];
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
        path: `api/Product/VIVOCloud/DisplayOrder`,
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

  changeIsEnabled($event, id: number) {
    this.vvtkService.patch(
      {
        path: `api/Product/VIVOCloud/${id}`
      },
      {
        isEnabled: $event.checked
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
