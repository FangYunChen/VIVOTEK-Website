import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductSpecificationDetail, Product } from 'projects/dashboard/src/app/vvtk-core/interface/product';
import { Subject, combineLatest } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { distinctUntilChanged, takeUntil, tap, concatMap, finalize } from 'rxjs/operators';
import { ProductReviewStateType } from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';

@Component({
  selector: 'vvtk-product-specification',
  templateUrl: './product-specification.component.html',
  styleUrls: ['./product-specification.component.scss']
})
export class ProductSpecificationComponent implements OnInit, OnDestroy {

  pageIsEditable: boolean;
  productId = 0;
  product: Product;
  specDetails: ProductSpecificationDetail[];
  filterTemp: string;
  selectTemp: string;

  productReviewStateType = ProductReviewStateType;

  isLoading = false;
  destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.filterTemp = value['filter'];
      this.selectTemp = value['select'];
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.route.params.subscribe(param => {
      this.productId = +param.id;
      const specification$ = this.sharedService.selectedLanguage$.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(_ => this.isLoading = true),
        concatMap(
          _ => this.getSpecifications().pipe(finalize(() => this.isLoading = false))
        )
      );
      combineLatest(
        this.getProductDetail(),
        specification$
      ).subscribe(([product, specDetails]) => {
        this.product = product;
        this.pageIsEditable = this.pageIsEditable && this.product.reviewState !== this.productReviewStateType.Pending;
        this.specDetails = specDetails;
      });
    });
  }

  getSpecifications() {
    return this.vvtkApiService.get<ProductSpecificationDetail[]>({
      path: `api/Products/${this.productId}/Specification`
    });
  }

  getProductDetail() {
    return this.vvtkApiService.get<Product>({
      path: `api/Products/${this.productId}`
    });
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.post(
      {
        path: `api/Products/${this.productId}/Specification`
      },
      this.postData
    ).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/products/product'], {queryParams: {filter: this.filterTemp, select: this.selectTemp}})
    );
  }

  private get postData() {
    return this.mapSpecDetailToArray(this.specDetails).map(x => <{ id: number, content: string }>{
      id: x.id,
      content: x.content
    });
  }

  private mapSpecDetailToArray(specDetail: ProductSpecificationDetail[]): ProductSpecificationDetail[] {
    if (specDetail) {
      let result: ProductSpecificationDetail[] = [];
      specDetail.forEach(category => {
        const pushData = Object.assign({}, category);
        pushData.children = null;
        result.push(pushData);
        if (category.children && category.children.length > 0) {
          const children = this.mapSpecDetailToArray(category.children);
          result = [...result, ...children];
        }
      });
      return result;
    }
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
