import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'projects/dashboard/src/app/vvtk-core/services/shared.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { map, finalize } from 'rxjs/operators';
import {
  ProductSelectorContent,
  SelectorOption,
  SelectorOptionRange
} from 'projects/dashboard/src/app/vvtk-core/interface/product-selector';
import { ProductSelectorType } from 'projects/dashboard/src/app/vvtk-core/constants/product-selector-constant';
import { Observable, combineLatest } from 'rxjs';
import { ProductSpecification } from 'projects/dashboard/src/app/vvtk-core/interface/product-specification';
import { ToolsService } from 'projects/dashboard/src/app/vvtk-core/services/tools.service';
import { Product } from 'projects/dashboard/src/app/vvtk-core/interface/product';
import { ProductReviewStateType } from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';

@Component({
  selector: 'vvtk-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  pageIsEditable: boolean;

  productId = 0;
  product: Product;
  data: ProductSelectorContent;

  productReviewStateType = ProductReviewStateType;
  productSelectorType = ProductSelectorType;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.route.params.subscribe(param => {
      this.productId = +param.id;
      this.isLoading = true;
      combineLatest(
        this.getProductDetail(),
        this.getData()
      ).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(([product, data]: [Product, ProductSelectorContent]) => {
        this.product = product;
        this.pageIsEditable = this.pageIsEditable && this.product.reviewState !== this.productReviewStateType.Pending;
        this.data = data;
      });
    });
  }

  getProductDetail() {
    return this.vvtkApiService.get<Product>({
      path: `api/Products/${this.productId}`
    });
  }

  getData(): Observable<ProductSelectorContent> {
    return this.vvtkApiService.get<ProductSelectorContent>({
      path: `api/Products/${this.productId}/Specification/SelectorContents`,
      disableLanguage: true
    }).pipe(
      map(x => {
        const selectorContent: ProductSelectorContent = {
          id: x.id,
          name: x.name,
          specifications: this.toolsService.mapTreeToArray<ProductSpecification>(x.specifications).filter(
            y => y.selectorOptions && y.selectorOptions.length > 0
          ),
          selectors: []
        };
        selectorContent.selectors = selectorContent.specifications.map(y => ({
          specName: y.name,
          selectorType: y.selectorType,
          selectorOptions: this.recursiveSetSelectorOptions(y.selectorType, y.selectorOptions as SelectorOption[])
        }));
        selectorContent.specifications = [];
        return selectorContent;
      })
    );
  }

  private recursiveSetSelectorOptions(selectorType: ProductSelectorType, selectorOptions: SelectorOption[]) {
    if (selectorOptions && selectorOptions.length > 0) {
      return selectorOptions.map(x => ({
        id: x.id,
        name: x.name,
        content: x.content ? JSON.parse(x.content as string) : selectorType === ProductSelectorType.Range ? {
          minimum: null,
          maximum: null
        } : false,
        isFilter: x.isFilter,
        minimum: x.minimum,
        maximum: x.maximum,
        unit: x.unit,
        children: this.recursiveSetSelectorOptions(selectorType, x.children),
      }));
    }
    return [];
  }

  save() {
    this.isLoading = true;
    this.vvtkApiService.post({
      path: `api/Products/${this.productId}/SelectorContents`,
      disableLanguage: true
    }, this.postData).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/products/product'])
    );
  }

  private get postData() {
    return this.data.selectors.map(
      x => this.toolsService.mapTreeToArray<SelectorOption>(x.selectorOptions)
    ).reduce(
      (pre, cur) => pre.concat(cur)
    ).filter(
      x => x.isFilter
        && x.content // filter checked
        && (x.content as SelectorOptionRange).maximum !== null // filter range
        && (x.content as SelectorOptionRange).minimum !== null // filter range
    ).map(
      x => ({
        selectorId: x.id,
        content: JSON.stringify(x.content)
      })
    );
  }

}
