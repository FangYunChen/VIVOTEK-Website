import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import {
  StakeholderFAQ,
  StakeholderFAQCategory
} from '../../../../../vvtk-core/classes/stakeholderFaq';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-investors-stakeholder-faq-list',
  templateUrl: './investors-stakeholder-faq-list.component.html',
  styleUrls: ['./investors-stakeholder-faq-list.component.scss']
})
export class InvestorsStakeholderFaqListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;

  categories: StakeholderFAQCategory[] = [];

  filterText = '';

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
      '/investors/stakeholder/faq/content/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/investors/stakeholder/faq/content/0'
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
        path: `api/StakeholderFAQ/Category/List`
      },
      {
        next: resp => {
          const body = resp.json();
          this.categories = body || [];
          this.getData();
        }
      }
    );
  }

  getData() {
    this.isLoading = true;
    this.categories.forEach(category => {
      category.sub = category.sub || [];
      category.sub.forEach(subCategory => {});
    });
    this.vvtkService.get(
      {
        path: `api/StakeholderFAQ/List`
      },
      {
        next: resp => {
          const body = resp.json();
          /*
                    body.sort((a, b) => {
                        return a.displayOrder < b.displayOrder ? 1 : -1;
                    });
                    */
          this.categories.forEach(category => {
            category.sub = category.sub || [];
            category.sub.forEach(subCategory => {
              subCategory.items = body.filter((item: StakeholderFAQ) => {
                return item.categoryId === subCategory.id;
              });
            });
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
            path: `api/StakeholderFAQ/${id}`,
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
    const sequenceData: StakeholderFAQ[] = [];
    let sequence: number;
    for (const category of this.categories) {
      for (const subCategory of category.sub) {
        sequence = 1;
        for (const item of subCategory.items.slice().reverse()) {
          sequenceData.push({
            id: item.id,
            categoryId: subCategory.id,
            displayOrder: sequence
          });
          sequence++;
        }
      }
    }

    this.vvtkService.patch(
      {
        path: `api/StakeholderFAQ/DisplayOrder`,
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
