import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { ConfirmComponent } from 'projects/dashboard/src/app/shared/components/confirm/confirm.component';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import {
  SupportArticleProductType,
  SupportArticleProductDisplayOrder
} from 'projects/dashboard/src/app/vvtk-core/interface/support-article';

@Component({
  selector: 'vvtk-product-list',
  templateUrl: './product-list.component.html'
})

export class ProductListComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  selectedLanguage$: Subscription;
  Products: SupportArticleProductType[] = [];
  isLoading = true;
  lockDelete = false;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 150,
    onUpdate: (event: any) => {
      this.patchSequence();
    }
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/supports/article/product/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/supports/article/product/0'
    );

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    this.vvtkApiService.get<SupportArticleProductType[]>({
      path: `api/Support/productTypes`,
      disableLanguage: false
    }).pipe(
      finalize(() =>
        this.isLoading = false
      )).subscribe(res => {
        this.Products = res;
      });
  }

  delete(id: number) {
    this.lockDelete = true;
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete(
          {
            path: `api/support/productTypes/${id}`,
            disableLanguage: true
          }
        ).pipe(
          finalize(() => {
            this.isLoading = false;
          })
        ).subscribe(
          _ => this.getData()
        );
      }
      this.lockDelete = false;
    });
  }

  patchSequence() {
    this.isLoading = true;
    const sequenceData: SupportArticleProductDisplayOrder[] = [];
    let sequence = 1;
    for (const Product of this.Products) {
      sequenceData.push({
        id: Product.id,
        displayOrder: sequence
      });
      sequence++;
    }

    this.vvtkApiService.patch(
      {
        path: `api/support/productTypes/changeDisplayOrder`,
        disableLanguage: true
      },
      sequenceData
    ).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe();
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
