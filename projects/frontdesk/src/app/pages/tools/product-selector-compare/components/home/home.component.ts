import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { I18nService, VvtkApiService } from '@frontdesk/core/services';
import { getProductUrlByName } from '@frontdesk/core/utils/product-utils';
import { saveAs } from 'file-saver/FileSaver';
import { combineLatest, Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import { NestedSpecificationCompareData } from '../nested-specification-compare/nested-specification-compare-model';
import { ProductInfo } from '../product-info/product-info-model';

interface ResultOfComparison {
  productDetails: ProductInfo[];
  specification: NestedSpecificationCompareData[];
}

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  routerUrl: string;
  productInfoList: ProductInfo[] = [];
  specTreeList: NestedSpecificationCompareData[] = [];
  productIds: number[] = [];
  isDownloading = false;

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private i18nService: I18nService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.routerUrl = event.url.split('#')[0];
      });

    this.route.queryParams.subscribe(queryParams => {
      // 因應需求及版面，最多只取8個產品。
      this.productIds = [].concat(queryParams.productIds || []).map(x => +x).slice(0, 8);
      this.loadData();
    });
  }

  ngOnInit() {
  }

  private loadData() {
    const api$ = this.vvtkApiService.post<ResultOfComparison>({
      path: 'api/Products/Selector/ResultOfComparison'
    }, this.productIds);
    combineLatest(
      api$,
      this.i18nService.selectedLanguage$
    ).subscribe(([data, lang]: [ResultOfComparison, string]) => {
      this.productInfoList = data.productDetails.map(p => {
        p.productUrl = getProductUrlByName(p.productName, lang);
        return p;
      });
      this.specTreeList = data.specification;
    });
  }

  downloadPDF() {
    this.isDownloading = true;
    this.vvtkApiService.downloadFileByPost({
      path: `api/ExportPDF/ProductCompare`
    }, this.productIds).pipe(
      finalize(() => this.isDownloading = false)
    ).subscribe(blob => {
      const pdf = new Blob([blob], {
        type: 'application/pdf'
      });
      saveAs(pdf, 'product_comparison_result.pdf');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
