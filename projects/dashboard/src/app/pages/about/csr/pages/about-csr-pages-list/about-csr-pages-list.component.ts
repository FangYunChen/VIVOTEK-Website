import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import {
  AboutCSRCategory,
  AboutCSRPage
} from '../../../../../vvtk-core/classes/aboutCSR';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-about-csr-pages-list',
  templateUrl: './about-csr-pages-list.component.html',
  styleUrls: ['./about-csr-pages-list.component.scss']
})
export class AboutCSRPagesListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;

  categories: AboutCSRCategory[] = [];

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
      '/about/csr/page/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/about/csr/page/content/0'
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
        path: `api/CSR/Categories/List`
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
        path: `api/CSR/Pages/List`
      },
      {
        next: resp => {
          const body = resp.json();
          body.sort((a, b) => {
            return a.displayOrder < b.displayOrder ? 1 : -1;
          });
          body.forEach((item: AboutCSRPage) => {
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
            path: `api/CSR/Page/${id}`,
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
    const sequenceData: AboutCSRPage[] = [];
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
        path: `api/CSR/Pages/DisplayOrder`,
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
