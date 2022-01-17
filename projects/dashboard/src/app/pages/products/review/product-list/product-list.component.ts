import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import {
  ProductReviewStateType,
  ProductReviewStateTypeMap,
  ProductUserReviewStateType
} from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';
import { ReplaySubject } from 'rxjs';
import { finalize, filter } from 'rxjs/operators';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { ProductReviewItem } from '../../../../vvtk-core/interface/product';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { environment } from 'projects/dashboard/src/environments/environment';
import { getProductUrlByName } from '@frontdesk/core/utils/product-utils';
import {
  ReviewDialogComponent,
  ReviewResult,
  ReviewData
} from 'projects/dashboard/src/app/shared/components/review-dialog/review-dialog.component';

@Component({
  selector: 'vvtk-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  pageIsEditable: boolean;

  isLoading = false;

  languages: CommonSelectOption[] = [];

  displayedColumns = [
    'name',
    'action'
  ];

  productReviewStateType = ProductReviewStateType;
  productReviewStateTypeMap: Map<number, string> = ProductReviewStateTypeMap;

  dataSource$ = new ReplaySubject<ProductReviewItem[]>(1);
  frontdeskUrl = environment.frontUrl;
  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.reloadData();
  }

  private reloadData() {
    this.isLoading = true;
    this.vvtkApiService.get<ProductReviewItem[]>({
      path: `api/Product/Reviews`,
      disableLanguage: true,
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      resp => this.dataSource$.next(
        resp
          .filter(x => x.userReviewState === ProductUserReviewStateType.Pending)
          .map(x => {
            if (x.url && x.url.startsWith('/')) {
              x.url = this.frontdeskUrl + x.url;
            } else if (!x.url) {
              x.url = this.frontdeskUrl + getProductUrlByName(x.name, null);
            }
            return x;
          })
      )
    );
  }

  review(productId: number, productName: string) {
    const dialogRef = this.dialog.open<ReviewDialogComponent, ReviewData, ReviewResult>(ReviewDialogComponent, {
      disableClose: false,
      data: {
        title: `Review product:${productName}`,
      }
    });
    dialogRef.afterClosed()
      .pipe(filter(result => !!result))
      .subscribe(result => {
        this.reviewProduct(productId, result);
      });
  }

  private reviewProduct(productId: number, reviewResult: ReviewResult) {
    const postData = {
      productId: productId,
      userReviewState: reviewResult.reviewResult ? ProductUserReviewStateType.Passed : ProductUserReviewStateType.Rejected,
      rejectedReason: reviewResult.rejectedReason
    };
    this.isLoading = true;
    this.vvtkApiService.patch({
      path: 'api/Product/Reviews',
      disableLanguage: true
    }, postData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.reloadData()
    );
  }

}
