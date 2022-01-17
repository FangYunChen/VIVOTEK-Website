import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ProductCategoryForNestedNav } from '../../interfaces/product-category-for-nested-nav';
import { NestedNavListData } from '@frontdesk/shared/components/nested-nav-list/nested-nav-list.component';
import { I18nService } from '@frontdesk/core/services';

const BASE_ROUTER_LINK = ['products'];

@Component({
  selector: 'vvtk-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  @Input()
  set categories(value: ProductCategoryForNestedNav[]) {
    this.originalCategories = value;
    const categories = this.convertCategoriesToNestedNavList(value);
    this.data = this.isLegacy
      ? [
        this.legacyProducts
      ]
      : [
        this.newProducts,
        ...(categories || [])
      ];
  }

  showCategories: boolean;
  baseRouterLink = ['/', ...BASE_ROUTER_LINK];
  data: NestedNavListData[];
  newProducts = { id: 0, name: 'New Products', path: 'new' };
  legacyProducts = { id: -1, name: 'Legacy Products', path: 'legacy' };

  private isLegacy: boolean;
  private originalCategories: ProductCategoryForNestedNav[];
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private i18nService: I18nService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.showCategories = false;

        this.i18nService.selectedLanguage$.subscribe(lang => {
          const paths = event.url.split('/');
          if (lang !== paths[1]) {
            lang = '';
          }
          const categoryBase = paths[1] === lang ? paths[2] : paths[1];
          this.baseRouterLink = ['/', `${lang || ''}`, categoryBase].filter(x => x);
          const legacyLen = this.baseRouterLink.length;
          this.isLegacy = paths.length === (legacyLen + 1) && paths[legacyLen].toLowerCase() === this.legacyProducts.path.toLowerCase();
          this.categories = this.originalCategories;
        });
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private convertCategoriesToNestedNavList(categories: ProductCategoryForNestedNav[]): NestedNavListData[] {
    if (categories && typeof categories.map === 'function') {
      return categories.map(category => {
        return {
          id: category.id,
          name: category.name,
          path: category.subRoute,
          disabled: !category.subRoute,
          children: this.convertCategoriesToNestedNavList(category.children)
        } as NestedNavListData;
      });
    } else {
      return categories;
    }
  }

}
