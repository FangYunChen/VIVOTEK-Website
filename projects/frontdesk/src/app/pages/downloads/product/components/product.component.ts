import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductCategoryForNestedNav } from '../../../products/interfaces/product-category-for-nested-nav';
// tslint:disable-next-line:max-line-length
import { DownloadDocumentType, DownloadCenterProperty, ProductDownload, ProductDownloadQuery } from '@frontdesk/core/interfaces/download-center';
import { CommonLazyLoadTableResponse, CommonSelectOption } from '@frontdesk/core/interfaces/common-model';
import { PageEvent } from '@angular/material';
import { map, concatMap, distinctUntilChanged, takeUntil, startWith, tap, debounceTime, filter, switchMap } from 'rxjs/operators';
import { ReplaySubject, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { DownloadCenterApiService } from '@frontdesk/core/services/api-data/download-center-api.service';
import { ProductApiService } from '@frontdesk/core/services/api-data/product-api.service';

@Component({
  selector: 'vvtk-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit, OnDestroy {

  productCategories: ProductCategoryForNestedNav[] = [];

  productMainCategoryOptions: CommonSelectOption[] = [];
  productSubCategoryOptions: CommonSelectOption[] = [];
  productOptions: CommonSelectOption[] = [];
  downloadTypeOptions: CommonSelectOption[] = [];

  selectedProductMainCategory$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  selectedProductSubCategory$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  searchModelName$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  selectedProduct$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  selectedDownloadType$: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  selectedLanguage$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  pageEvent$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({ pageSize: 10, pageIndex: 0, length: 0 });

  dataSource$ = new ReplaySubject<CommonLazyLoadTableResponse<ProductDownload>>(1);
  destroy$ = new Subject();
  dynamicColumns: DownloadCenterProperty[];
  constructor(
    private downloadCenterApiService: DownloadCenterApiService,
    private productApiService: ProductApiService,
  ) { }

  ngOnInit() {
    this.setProductCategoryOptions();
    this.setColumns();
  }

  ngAfterViewInit() {
    this.handleFilters();
  }

  private setProductCategoryOptions() {
    this.productApiService.getProductCategories().subscribe(categories => {
      this.productCategories = categories;
      this.productMainCategoryOptions = categories.filter(x => x.parentId === -1).map(x => ({ value: x.id, optionText: x.name }));
    });
  }

  private setColumns() {
    this.downloadCenterApiService.getDocumentTypes().pipe(
      tap(documentTypes => this.setDownloadTypeOptions(documentTypes)),
      concatMap(types => this.downloadCenterApiService.getDocumentPropertyMapping(types.find(x => x.name === 'Product').id))
    ).subscribe(mappings => {
      this.dynamicColumns = [{ id: 0, name: 'Document Type', type: 1 }, ...mappings];
    });
  }

  private setDownloadTypeOptions(documentTypes: DownloadDocumentType[]) {
    this.downloadTypeOptions = [
      { value: null, optionText: 'All' },
      ...documentTypes.find(x => x.name === 'Product').children.map(y => ({ value: y.id, optionText: y.name }))];
  }

  private handleFilters() {
    const selectedProductMainCategory$ = this.selectedProductMainCategory$.pipe(
      distinctUntilChanged(),
      tap(categoryId => {
        this.selectedProductSubCategory$.next(null);
        const category = this.productCategories.find(x => x.id === categoryId);
        if (category) {
          category.children = category.children || [];
          this.productSubCategoryOptions = [
            { value: null, optionText: 'All' },
            ...category.children.map(x => ({ value: x.id, optionText: x.name }))
          ];
        } else {
          this.productSubCategoryOptions = [];
        }
      }),
      takeUntil(this.destroy$)
    );

    const selectedProductSubCategory$ = this.selectedProductSubCategory$.pipe(
      startWith(0),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    const selectedCategory$ = combineLatest(
      selectedProductMainCategory$,
      selectedProductSubCategory$
    ).pipe(
      debounceTime(100),
      map(([mainCategoryId, subCategoryId]) => subCategoryId ? subCategoryId : mainCategoryId),
      tap(categoryId => {
        this.selectedProduct$.next(null);
        if (categoryId) {
          this.productApiService.getProductByCategory(categoryId)
            .subscribe(products => this.productOptions = [
              { value: null, optionText: 'All' },
              ...products.map(y => ({ optionText: y.name, value: y.id }))
            ]);
        }
      }),
      filter(_ => !this.searchModelName$.value),
    );

    const searchModelName$ = this.searchModelName$.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    const selectedProduct$ = this.selectedProduct$.pipe(
      startWith(0),
      filter(_ => !this.searchModelName$.value),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    const selectedDownloadType$ = this.selectedDownloadType$.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    const selectedLanguage$ = this.selectedLanguage$.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    const paginationChange$ = this.pageEvent$.pipe(
      takeUntil(this.destroy$)
    );

    combineLatest(
      selectedCategory$,
      selectedProduct$,
      searchModelName$,
      selectedDownloadType$,
      selectedLanguage$,
      paginationChange$
    ).pipe(
      debounceTime(500),
      takeUntil(this.destroy$),
      filter(([selectedCategory, selectedProduct, searchModelName, selectedDownloadType]) =>
        selectedCategory !== null || selectedProduct !== null ||
        searchModelName !== null || selectedDownloadType !== null
      ),
      switchMap(([selectedCategory, selectedProduct, searchModelName, selectedDownloadType, selectedLanguage, page]) => {
        const query: ProductDownloadQuery = {
          keyword: searchModelName,
          documentTypeId: selectedDownloadType,
          productId: selectedProduct,
          categoryId: selectedCategory,
          pageIndex: page.pageIndex,
          pageSize: page.pageSize
        };
        for (const key in query) {
          if (query[key] === null) {
            delete query[key];
          }
        }
        return this.downloadCenterApiService.getProductDownloadData(selectedLanguage, query);
      }),
    ).subscribe(data => {
      this.dataSource$.next(data);
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
