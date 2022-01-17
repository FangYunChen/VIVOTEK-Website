import { InvestorsServiceCategory, InvestorsServicePage } from './../../../../../vvtk-core/classes/investorsService';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-investors-service-pages-list',
  templateUrl: './investors-service-pages-list.component.html',
  styleUrls: ['./investors-service-pages-list.component.scss']
})
export class InvestorsServicePagesListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;

  categories: InvestorsServiceCategory[] = [];

  isLoading = true;
  lockDelete = false;

  groupOptions: SortablejsOptions = {
    group: 'group1',
    handle: '.drag-handle',
    animation: 300,
    onEnd: (event: any) => {
      this.patchSequence();
    }
  };

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/investors/service/page/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/investors/service/page/content/0'
    );

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getCategories();
      }
    );
  }

  getCategories() {
    this.vvtkService.get(
      {
        path: `api/Investors/Categories/List`
      },
      {
        next: resp => {
          const body = resp.json();
          this.categories = body || [];
          this.categories.sort((a, b) => {
            return a.displayOrder < b.displayOrder ? 1 : -1;
          });
          this.getData();
        }
      }
    );
  }

  getData() {
    this.isLoading = true;
    this.categories.forEach(category => {
      category.pages = [];
    });
    this.vvtkService.get(
      {
        path: `api/Investors/Pages/List`
      },
      {
        next: resp => {
          const body = resp.json();
          body.sort((a, b) => {
            return a.displayOrder < b.displayOrder ? 1 : -1;
          });
          body.forEach((item: InvestorsServicePage) => {
            const find = this.categories.find(category => {
              return category.id === item.categoryId;
            });
            if (find) {
              find.pages.push(item);
            }
          });
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
            path: `api/Investors/Page/${id}`,
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
    const sequenceData: InvestorsServicePage[] = [];
    let sequence: number;
    for (const category of this.categories) {
      sequence = 1;
      for (const item of category.pages.slice().reverse()) {
        sequenceData.push({
          id: item.id,
          categoryId: category.id,
          displayOrder: sequence
        });
        sequence++;
      }
    }

    this.vvtkService.patch(
      {
        path: `api/Investors/Pages/DisplayOrder`,
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
