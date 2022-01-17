import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import {
  HomeSection,
  HomeSectionSequence
} from '../../../../vvtk-core/classes/homeSection';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-home-sections-list',
  templateUrl: './home-sections-list.component.html',
  styleUrls: ['./home-sections-list.component.scss']
})
export class HomeSectionsListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;
  data: HomeSection[];

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
  ) {}

  ngOnInit() {
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/home/section/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/home/section/content/0'
    );

    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/Home/Section`
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
        title: 'delete section?',
        message: `確定刪除主題區塊：${title}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkService.delete(
          {
            path: `api/Home/Section/${id}`,
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
    const sequenceData: HomeSectionSequence[] = [];
    let sequence = 1;
    for (let i = this.data.length - 1; i >= 0; i--) {
      sequenceData.push({
        id: this.data[i].id,
        sequence: sequence
      });
      sequence++;
    }

    this.vvtkService.patch(
      {
        path: `api/Home/Section/Sequence`,
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

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
