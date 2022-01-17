import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTab, Product, ProductFeature, ProductCard, ProductSpecificationDetail } from '../../../../../vvtk-core/interface/product';
import { TabTypeList } from '../../../../../vvtk-core/constants/product-constant';
import { CommonSelectOption } from '../../../../../vvtk-core/interface/common-model';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { of, Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, tap, map, distinctUntilChanged, finalize, concatMap, switchMap, first } from 'rxjs/operators';
import { TemplatesComponent } from '../../../../../shared/components/templates/templates.component';
import { DynamicComponentHostDirective } from '../../../../../shared/directives/dynamic-component-host.directive';
import { KeyFeatureComponent } from './key-feature/key-feature.component';
import { RelatedProductComponent } from './related-product/related-product.component';
import { VvtkApiService } from '../../../../../vvtk-core/services/vvtk-api.service';
import { ProductReviewStateType } from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';

@Component({
  selector: 'vvtk-tab-content',
  templateUrl: './tab-content.component.html',
  styleUrls: ['./tab-content.component.scss']
})

export class TabContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  filterTemp: string;
  selectTemp: string;
  tabId = 0;
  productTab: ProductTab = { templates: [], isDisplayOnTop: true };
  productId = 0;
  product: Product;

  tabTypesList: CommonSelectOption[] = TabTypeList;
  isLoading = false;

  destroy$ = new Subject();

  // reference to TabTypeList
  tabDataMapping = new Map<number, any>(
    [
      [0, { component: TemplatesComponent, isTemplate: true }],
      [1, { component: KeyFeatureComponent, isTemplate: false }],
      [2, { component: TemplatesComponent, isTemplate: true }],
      [3, { component: TemplatesComponent, isTemplate: true, canUseTemplateTypes: [201] }],
      [4, { isTemplate: false }],
      [5, { component: TemplatesComponent, isTemplate: true, canUseTemplateTypes: [29] }],
      [6, { component: TemplatesComponent, isTemplate: true, canUseTemplateTypes: [11] }],
      [7, { component: TemplatesComponent, isTemplate: true, canUseTemplateTypes: [2] }],
      [8, { isTemplate: false }],
      [9, { component: TemplatesComponent, isTemplate: true, canUseTemplateTypes: [11] }],
      [10, { component: RelatedProductComponent, isTemplate: false }],
    ]
  );

  productReviewStateType = ProductReviewStateType;

  @ViewChild(DynamicComponentHostDirective) dynamicComponentLoader: DynamicComponentHostDirective;
  tabDataComponentRef;
  path = 'Product';

  get isAddTab(): boolean {
    return this.tabId === 0;
  }

  constructor(
    private componenFactoryResolver: ComponentFactoryResolver,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private vvtkApiService: VvtkApiService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.filterTemp = value['filter'] ? value['filter'] : '';
      this.selectTemp = value['select'] ? value['select'] : '0';
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.route.params.subscribe(param => {
      this.productId = +param.productId;
      this.tabId = +param.tabId;
      this.getProductDetail().subscribe(x => {
        this.product = x;
        this.pageIsEditable = this.pageIsEditable && this.product.reviewState !== this.productReviewStateType.Pending;
      });
      this.sharedService.selectedLanguage$.pipe(
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        tap(_ => this.isLoading = true),
        concatMap(
          _ => this.getProductTabData().pipe(finalize(() => this.isLoading = false))
        )
      ).subscribe();
    });
  }

  getProductDetail() {
    return this.vvtkApiService.get<Product>({
      path: `api/Products/${this.productId}`
    });
  }

  getProductTabData(): Observable<Product | string | ProductFeature[] | ProductCard[]> {
    if (this.isAddTab) {
      return this.vvtkApiService.get<Product>({
        path: `api/Products/${this.productId}`
      }).pipe(
        tap((product: Product) => {
          this.productTab.productName = product.name;
          this.productTab.productType = product.type;
          if (this.productTab.productType !== 1) {
            this.productTab.tabType = 0;
            this.setTabDataComponent();
          }
        })
      );
    } else {
      return this.vvtkApiService.get<ProductTab>({
        path: `api/Products/${this.productId}/Tabs/${this.tabId}`
      }).pipe(
        switchMap(
          productTab => {
            this.productTab = productTab;
            this.path = `Product/${this.productTab.productName}`;
            this.setTabDataComponent();
            return this.getDataByTabType();
          }
        )
      );
    }
  }

  selectTabType() {
    this.setTabDataComponent();
    this.isLoading = true;
    this.getDataByTabType().pipe(
      first(),
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  getDataByTabType(): Observable<ProductFeature[] | ProductCard[] | string> {
    switch (this.productTab.tabType) {
      case 1:
        return this.getFeatures();
      case 10:
        return this.getRelatedProducts();
      default:
        return of('');
    }
  }

  setTabDataComponent() {
    const viewContainerRef = this.dynamicComponentLoader.viewContainerRef;
    viewContainerRef.clear();
    const tabDataSetting = this.tabDataMapping.get(this.productTab.tabType);
    const targetComponent = tabDataSetting.component;
    if (targetComponent) {
      const componentFactory = this.componenFactoryResolver.resolveComponentFactory(targetComponent);
      this.tabDataComponentRef = viewContainerRef.createComponent(componentFactory);
      if (tabDataSetting.isTemplate) {
        this.setTemplatesComponentData(tabDataSetting.canUseTemplateTypes);
      }
    }

  }

  setTemplatesComponentData(canUseTemplateTypes: number[]) {
    (this.tabDataComponentRef.instance as TemplatesComponent).types = canUseTemplateTypes;
    (this.tabDataComponentRef.instance as TemplatesComponent).readOnly = !this.pageIsEditable;
    (this.tabDataComponentRef.instance as TemplatesComponent).path = this.path;
    (this.tabDataComponentRef.instance as TemplatesComponent).includeSpecialType = true;
    (this.tabDataComponentRef.instance as TemplatesComponent).setData(this.productTab.templates || []);
  }

  getFeatures() {
    return this.vvtkApiService.get<ProductFeature[]>({
      path: `api/Products/${this.productId}/Features`
    }).pipe(tap(
      features => { this.setFeatureComponentData(features); }
    ));
  }

  setFeatureComponentData(features: ProductFeature[]) {
    (this.tabDataComponentRef.instance as KeyFeatureComponent).pageIsEditable = this.pageIsEditable;
    (this.tabDataComponentRef.instance as KeyFeatureComponent).features = features || [];
  }

  getRelatedProducts() {
    return this.vvtkApiService.get<ProductCard[]>({
      path: `api/Products/${this.productId}/RelatedProducts`,
      disableLanguage: true
    }).pipe(tap(
      relatedProducts => { this.setRelatedProductComponentData(relatedProducts); }
    ));
  }

  setRelatedProductComponentData(relatedProducts: ProductCard[]) {
    (this.tabDataComponentRef.instance as RelatedProductComponent).pageIsEditable = this.pageIsEditable;
    (this.tabDataComponentRef.instance as RelatedProductComponent).relatedProducts = relatedProducts || [];
  }

  save() {
    this.isLoading = true;
    let otherDataFinish$: Observable<boolean>;
    switch (this.productTab.tabType) {
      case 1:
        otherDataFinish$ = this.saveFeatureData();
        break;
      case 10:
        otherDataFinish$ = this.saveRelatedProductData();
        break;
      default:
        otherDataFinish$ = of(true);
    }
    const tabDataFinish$ = this.saveTabData();
    combineLatest(otherDataFinish$, tabDataFinish$).pipe(
      finalize(() => { this.isLoading = false; }),
      takeUntil(this.destroy$)
    ).subscribe(
      ([isOtherDataFinish, isTabDataFinish]) => {
        if (isOtherDataFinish && isTabDataFinish) {
          // tslint:disable-next-line: max-line-length
          this.router.navigate(['/products/product/tab', this.productId], {queryParams: {filter: this.filterTemp, select: this.selectTemp}});
        }
      }
    );
  }

  saveFeatureData(): Observable<boolean> {
    const features = (this.tabDataComponentRef.instance as KeyFeatureComponent).features;
    return this.vvtkApiService.post(
      {
        path: `api/Products/${this.productId}/Features`
      },
      features
    ).pipe(map(x => true));
  }

  saveRelatedProductData(): Observable<boolean> {
    const relatedProducts = (this.tabDataComponentRef.instance as RelatedProductComponent).relatedProducts;
    const relatedProductIds = relatedProducts.map(x => x.id);
    return this.vvtkApiService.post(
      {
        path: `api/Products/${this.productId}/RelatedProducts`,
        disableLanguage: true
      }, relatedProductIds)
      .pipe(map(x => true));
  }

  saveTabData(): Observable<boolean> {
    if (this.tabDataMapping.get(this.productTab.tabType).isTemplate) {
      this.productTab.templates = (this.tabDataComponentRef.instance as TemplatesComponent).getData();
    } else {
      this.productTab.templates = null;
    }
    let apiPath;
    if (this.isAddTab) {
      apiPath = {
        path: `api/Products/${this.productId}/Tabs`,
        disableLanguage: true
      };
    } else {
      apiPath = {
        path: `api/Products/${this.productId}/Tabs/${this.tabId}`
      };
    }
    return this.vvtkApiService.post(apiPath, this.productTab).pipe(map(x => true));
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
