import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { combineLatest, Subject } from 'rxjs';
import { concatMap, distinctUntilChanged, filter, finalize, takeUntil, tap } from 'rxjs/operators';
import { ConfirmComponent } from '../../../../../shared/components/confirm/confirm.component';
import { Product, ProductTab, ProductTabDetail } from '../../../../../vvtk-core/interface/product';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { ProductReviewStateType } from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';

@Component({
  selector: 'vvtk-tab-list',
  templateUrl: './tab-list.component.html',
  styleUrls: ['./tab-list.component.scss']
})
export class TabListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  filterTemp: string;
  selectTemp: string;
  productId = 0;
  product: Product;
  data: ProductTabDetail;

  productReviewStateType = ProductReviewStateType;

  isLoading = false;
  destroy$ = new Subject();

  groupOptions: SortablejsOptions = {
    group: 'group',
    handle: '.drag-handle',
    animation: 300,
    onUpdate: (event: any) => {
      this.patchSequence();
    }
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.filterTemp = value['filter'] ? value['filter'] : '';
      this.selectTemp = value['select'] ? value['select'] : '0';
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/products/product/tab/0/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/products/product/tab/0/0'
    );

    this.route.params.subscribe(param => {
      this.productId = +param.productId;
      const tabList$ = this.sharedService.selectedLanguage$.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(_ => this.isLoading = true),
        concatMap(
          _ => this.getData().pipe(finalize(() => this.isLoading = false))
        )
      );
      combineLatest(
        this.getProductDetail(),
        tabList$
      ).subscribe(([product, data]) => {
        this.product = product;
        this.pageIsEditable = this.pageIsEditable && this.product.reviewState !== this.productReviewStateType.Pending;
        this.pageContentIsEditable = this.pageContentIsEditable && this.product.reviewState !== this.productReviewStateType.Pending;
        this.data = data;
      });
    });
  }

  getProductDetail() {
    return this.vvtkApiService.get<Product>({
      path: `api/Products/${this.productId}`
    });
  }

  getData() {
    return this.vvtkApiService.get<ProductTabDetail>({
      path: `api/Products/${this.productId}/Tabs`
    });
  }

  delete(tabId: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'delete?',
        message: `確定刪除：${title}?`
      }
    });
    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(result => {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/Products/${this.productId}/Tabs/${tabId}`,
          disableLanguage: true
        })
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(_ => {
            this.data.list = this.data.list.filter(x => x.id !== tabId);
          });
      });
  }

  patchSequence() {
    const sequenceData: ProductTab[] = this.data.list.map((tab, index) => ({
      id: tab.id,
      displayOrder: index + 1
    }));
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Products/${this.productId}/Tabs/ChangeDisplayOrder`,
      disableLanguage: true
    }, sequenceData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe();
  }

  changeIsDisplayOnTop($event, tabId: number) {
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: `api/Products/${this.productId}/Tabs/${tabId}/SetDisplayOnTop`,
      disableLanguage: true
    }, { isDisplayOnTop: $event.checked })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
