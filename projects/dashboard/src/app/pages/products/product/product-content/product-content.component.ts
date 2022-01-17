import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { Product, ProductCard } from '../../../../vvtk-core/interface/product';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { ImageType, Image } from '../../../../vvtk-core/interface/image';
import { IconType } from '../../../../vvtk-core/interface/icon';
import { ProductPageTypeList, SeriesList, StateList, ProductImageMappingType } from '../../../../vvtk-core/constants/product-constant';
import { distinctUntilChanged, takeUntil, tap, concatMap, finalize, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { VvtkApiService } from '../../../../vvtk-core/services/vvtk-api.service';
import { DropdownListService } from '../../../../vvtk-core/services/dropdown-list.service';
import { ProductReviewStateType } from 'projects/dashboard/src/app/vvtk-core/constants/product-review-state-constant';

@Component({
  selector: 'vvtk-product-content',
  templateUrl: './product-content.component.html'
})
export class ProductContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;
  destroy$ = new Subject();

  id: number;
  filterTemp: string;
  selectTemp: string;
  product: Product;
  path = 'Product';
  productCategoryOptions: CommonSelectOption[] = [];
  productPageTypes: CommonSelectOption[] = ProductPageTypeList;
  seriesList: CommonSelectOption[] = SeriesList;
  states: CommonSelectOption[] = StateList;

  imageTypes: ImageType[] = [];
  iconTypes: IconType[] = [];

  coverImages: Image[] = [];
  generalImages: Image[] = [];
  sixViewImages: Image[] = [];
  isLoading = false;

  copyModel = false;
  copyProductCategory: number;
  copyProductOptions: CommonSelectOption[] = [];
  copyProductId: number;

  productReviewStateType = ProductReviewStateType;

  get isAddProduct() {
    return this.id === 0;
  }

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private dropdownListService: DropdownListService,
    private router: Router
  ) {
    this.product = {
      id: 0,
      parentCategories: [],
      name: '',
      type: 0,
      images: [],
      icons: [],
      url: '',
      state: null,
      msg : '',
      showMsg: false
    };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((value) => {
      this.filterTemp = value['filter'];
      this.selectTemp = value['select'];
    });
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.dropdownListService.getProductCategoryOptions().subscribe(
      categories => this.productCategoryOptions = categories
    );
    this.getImageTypes().subscribe(
      imageTypes => this.imageTypes = imageTypes
    );
    this.getIconTypeOptions().subscribe(
      iconTypes => this.iconTypes = iconTypes
    );
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id > 0) {
        this.sharedService.selectedLanguage$.pipe(
          distinctUntilChanged(),
          takeUntil(this.destroy$),
          tap(_ => this.isLoading = true),
          concatMap(
            _ => this.getProduct(this.id).pipe(finalize(() => this.isLoading = false))
          )
        ).subscribe();
      }
    });
  }

  getImageTypes() {
    return this.vvtkApiService.get<ImageType[]>({
      path: `api/ImageGroup/ImageTypes/All`,
      disableLanguage: true
    });
  }

  getIconTypeOptions() {
    return this.vvtkApiService.get<IconType[]>({
      path: `api/Icons/IconTypes/All`,
      disableLanguage: true
    });
  }

  getProduct(id: number) {
    return this.vvtkApiService.get<Product>({
      path: `api/Products/${id}`
    }).pipe(tap(
      product => {
        this.product = product;
        this.pageIsEditable = this.pageIsEditable && this.product.reviewState !== this.productReviewStateType.Pending;
        const cover = this.product.images.find(x => x.type === ProductImageMappingType.Cover);
        const general = this.product.images.find(x => x.type === ProductImageMappingType.General);
        const sixView = this.product.images.find(x => x.type === ProductImageMappingType.SixView);
        this.coverImages = cover ? cover.images || [] : [];
        this.generalImages = general ? general.images || [] : [];
        this.sixViewImages = sixView ? sixView.images || [] : [];
      })
    );
  }

  getAllProductByCategory(categoryId: number) {
    this.isLoading = true;
    this.vvtkApiService.get<ProductCard[]>({
      path: `api/Products/Category/${categoryId}/Products`,
      disableLanguage: true
    }).pipe(
      map(
        products => products.map(
          product => <CommonSelectOption>{
            value: product.id,
            optionText: product.name
          })
      ),
      finalize(() => this.isLoading = false)
    ).subscribe(
      data => this.copyProductOptions = data
    );
  }

  getCopyProduct(productId: number) {
    this.getProduct(productId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe();
  }

  save() {
    this.isLoading = true;
    const postData: Product = this.setPostData();
    let save$: Observable<any>;
    if (this.isAddProduct) {
      save$ = this.vvtkApiService.post({
        path: `api/Products`,
        disableLanguage: true
      }, postData);
      console.log(postData);
    } else {
      save$ = this.vvtkApiService.post({
        path: `api/Products/${this.id}`
      }, postData);
    }
    save$.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      _ => this.router.navigate(['/products/product'], {queryParams: {filter: this.filterTemp, select: this.selectTemp}})
    );
  }

  setPostData(): Product {
    this.product.images = [
      { type: ProductImageMappingType.Cover, images: this.coverImages },
      { type: ProductImageMappingType.General, images: this.generalImages },
      { type: ProductImageMappingType.SixView, images: this.sixViewImages },
    ];
    const postData: Product = this.toolsService.copyObject(this.product);
    switch (this.product.type) {
      case 1:
        postData.url = null;
        break;
      case 2:
      case 3:
        postData.icons = [];
        postData.images = postData.images.filter(x => x.type === ProductImageMappingType.Cover);
        postData.series = null;
        postData.url = null;
        break;
      case 4:
        postData.icons = [];
        postData.images = postData.images.filter(x => x.type === ProductImageMappingType.Cover);
        postData.series = null;
        break;
    }
    if (this.product.state !== 3) {
      postData.legacyDescription = null;
    }
    postData.icons.forEach((icon, index) => {
      icon.displayOrder = index + 1;
    });
    postData.images.forEach(productImg => {
      productImg.images.forEach((img, index) => {
        img.displayOrder = index + 1;
      });
    });
    if (this.copyModel) {
      postData.duplicateProductId = this.copyProductId;
    }
    return postData;
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
