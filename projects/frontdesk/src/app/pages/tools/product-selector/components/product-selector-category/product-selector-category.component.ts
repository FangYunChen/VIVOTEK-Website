import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ProductSelectorCategoryModel } from './product-selector-category-model';

@Component({
  selector: 'vvtk-product-selector-category',
  templateUrl: './product-selector-category.component.html',
  styleUrls: ['./product-selector-category.component.scss']
})
export class ProductSelectorCategoryComponent implements OnInit, OnDestroy {

  @Input() baseRouterLink: any[] = [];
  @Input()
  set data(value: ProductSelectorCategoryModel[]) {
    this._data = value;
    this.updateActiveInfo();
  }
  get data() {
    return this._data;
  }

  private _data: ProductSelectorCategoryModel[];
  private destroy$ = new Subject();

  constructor(
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        // 為了選單開關做延遲時間，要修復此做法應與material expansion panel元件或是angular生命週期有關。
        setTimeout(() => {
          this.updateActiveInfo();
        }, 10);
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackItem(index, item: ProductSelectorCategoryModel) {
    return item ? item.id : undefined;
  }

  private updateActiveInfo() {
    (this.data || []).forEach(item => {
      item.active = this.checkActive(this.router.url, this.baseRouterLink, item);
      item.isDisplaySpecifications = (
        item.active &&
        item.id === item.categoryIdWhichHasSpec &&
        !(item.children || []).some(
          child => child.hasSpec && this.checkActive(this.router.url, this.baseRouterLink.concat(item.subRoute), child)
        )
      );
    });
  }

  private checkActive(
    currentUrl: string,
    baseRouterLink: any[],
    item: ProductSelectorCategoryModel
  ) {
    const link = `/${baseRouterLink.filter(x => !!x && x !== '/').join('/')}/${item.subRoute}`;
    const arr = currentUrl.split(link);
    const isUrlStartWithLink = arr[0] === '';
    const isBasePath = !arr[1] || arr[1][0] === '/';
    return isUrlStartWithLink && isBasePath;
  }

}
