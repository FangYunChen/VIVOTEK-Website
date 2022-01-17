import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, PageEvent, Sort } from '@angular/material';
import {
  ProductReviewStateType,
  ProductReviewStateTypeMap
} from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';
import { combineLatest, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, share, startWith, takeUntil, filter } from 'rxjs/operators';
import { ConfirmComponent } from '../../../../shared/components/confirm/confirm.component';
import { ProductPageTypeList } from '../../../../vvtk-core/constants/product-constant';
import { CommonLazyLoadTableResponse, CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { ProductListItem } from '../../../../vvtk-core/interface/product';
import { DropdownListService } from '../../../../vvtk-core/services/dropdown-list.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { AvailableLangComponent } from './available-lang/available-lang.component';
import { ExportPDFComponent } from './export-pdf/export-pdf.component';
import {
  SubmitReviewComponent,
  SubmitReviewSetting,
  SubmitReviewData
} from 'projects/dashboard/src/app/shared/components/submit-review/submit-review.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vvtk-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  isLoading = false;

  languages: CommonSelectOption[] = [];

  displayedColumns = [
    'name',
    'series',
    'type',
    'rootCategories',
    'langOnTheMarket',
    'reviewState',
    'action'
  ];

  categories: CommonSelectOption[] = [];

  productPageTypeMap: Map<number, string> = new Map<number, string>();

  productReviewStateType = ProductReviewStateType;
  productReviewStateTypeMap: Map<number, string> = ProductReviewStateTypeMap;

  dataSource$ = new ReplaySubject<CommonLazyLoadTableResponse<ProductListItem>>(1);
  destroy$ = new Subject();

  @ViewChild('filter') filter: NgModel;
  @ViewChild('selectedCategory') selectedCategory: NgModel;
  @ViewChild('reviewsSubmittedByCurrentUser') reviewsSubmittedByCurrentUser: NgModel;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private dropdownListService: DropdownListService,
    public dialog: MatDialog
  ) { }

  filterV: string;
  selectC: number;

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.filterV = value['filter'] ? value['filter'] : '';
      this.selectC = value['select'] ? Number(value['select']) : 0;
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/products/product/0'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/products/product/0'
    );

    ProductPageTypeList.forEach(val => {
      this.productPageTypeMap.set(+val.value, val.optionText);
    });

    this.getCategories();
    this.getAllLangOptions();


    const filterValueChange$ = this.filter.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const selectedCategoryValueChange$ = this.selectedCategory.valueChanges.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const reviewsSubmittedByCurrentUserValueChange$ = this.reviewsSubmittedByCurrentUser.valueChanges.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );

    const sortChange$ = this.sort.sortChange.pipe(
      startWith({ active: 'name', direction: 'asc' }),
      share(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.paginator.page.pipe(
      startWith({ pageIndex: 0, pageSize: 10 }),
      share(),
      takeUntil(this.destroy$)
    );

    combineLatest(
      filterValueChange$,
      selectedCategoryValueChange$,
      reviewsSubmittedByCurrentUserValueChange$,
      sortChange$,
      paginationChange$
    ).subscribe(
      ([filterValue, selectedCategory, reviewsSubmittedByCurrentUser, sort, page]: [string, string, boolean, Sort, PageEvent]) => {
        this.reloadData(filterValue, Number(selectedCategory), reviewsSubmittedByCurrentUser, sort, page);
      });
  }

  getCategories() {
    this.dropdownListService.getProductCategoryOptions().subscribe(
      options => {
        this.categories = options;
      }
    );
  }

  getAllLangOptions() {
    this.dropdownListService.getAllLangOptions().subscribe(
      options => {
        this.languages = options;
      }
    );
  }

  private reloadData(filterValue: string, selectedCategory: number, reviewsSubmittedByCurrentUser: boolean, sort: Sort, page: PageEvent) {
    this.isLoading = true;
    this.vvtkApiService.get<CommonLazyLoadTableResponse<ProductListItem>>({
      path: `api/Products`,
      disableLanguage: true,
      query: {
        name: filterValue,
        categoryId: selectedCategory,
        reviewsSubmittedByCurrentUser: reviewsSubmittedByCurrentUser,
        orderBy: sort.active,
        sort: sort.direction,
        pageIndex: page.pageIndex,
        pageSize: page.pageSize
      }
    }).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      resp => this.dataSource$.next(resp)
    );
  }

  editAvailableLang(model: ProductListItem) {
    const dialogRef = this.dialog.open(AvailableLangComponent, {
      disableClose: false,
      data: {
        product: model,
        langOptions: this.languages
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.vvtkApiService.post({
          path: `api/Products/${model.id}/MarketInformation`,
          disableLanguage: true
        }, result).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(_ => model.langOnTheMarket = result);
      }
    });
  }

  exportPDF(id: number, name: string) {
    this.dialog.open(ExportPDFComponent, {
      disableClose: false,
      data: {
        id: id,
        productName: name,
        langOptions: this.languages
      }
    });
  }

  submitReview(product: ProductListItem) {
    const dialogRef = this.dialog.open<SubmitReviewComponent, SubmitReviewSetting, SubmitReviewData>(SubmitReviewComponent, {
      disableClose: false,
      data: {
        title: `Are you sure you want to submit ${product.name} for review?`,
        apiUrl: `api/Product/${product.id}/AvailableReviewers`
      }
    });
    dialogRef.afterClosed()
      .pipe(filter(x => !!x))
      .subscribe(result => {
        this.isLoading = true;
        this.vvtkApiService.post({
          path: `api/Product/${product.id}/Reviewers`,
          disableLanguage: true
        }, result).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(_ => product.reviewState = this.productReviewStateType.Pending);
      });
  }

  delete(id: number, productName: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      disableClose: false,
      data: {
        title: 'Delete product?',
        message: `Delete this product：${productName}?`
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.isLoading = true;
        this.vvtkApiService.delete({
          path: `api/Products/${id}`,
          disableLanguage: true
        }).subscribe(
          _ => this.reloadData(
            this.filter.value,
            this.selectedCategory.value,
            this.reviewsSubmittedByCurrentUser.value,
            this.sort,
            this.paginator
          ),
          error => this.isLoading = false
        );
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
