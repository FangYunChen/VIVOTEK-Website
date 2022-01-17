import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { LayoutMenuNode } from '@frontdesk/core/interfaces';
import { ProductCategoryRoutes } from '../../interfaces/product-category-route';
import { I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-top-banner-for-product-page',
  templateUrl: './top-banner-for-product-page.component.html',
  styleUrls: ['./top-banner-for-product-page.component.scss']
})
export class TopBannerForProductPageComponent implements OnInit, OnChanges {

  @Input() productCategoryRoutes: ProductCategoryRoutes[] = [];
  @Input() productName = '';

  breadcrumbs: LayoutMenuNode[] = [];

  constructor(
    private i18nService: I18nService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.productCategoryRoutes) {
      this.setBreadcrumbs();
    }
  }

  setBreadcrumbs() {
    const prefixUrl = `${this.i18nService.getSelectedLanguageForLink()}/products`;
    let currentCategoryPath = '';
    this.breadcrumbs = (this.productCategoryRoutes || []).map(category => {
      currentCategoryPath += `/${category.subRoute}`;
      return {
        title: category.name,
        url: prefixUrl + currentCategoryPath
      };
    });
  }

}
