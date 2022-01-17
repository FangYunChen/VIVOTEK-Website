import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { timer, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { GridListItem } from '@frontdesk/core/interfaces/grid-list-item';
import { VvtkApiService } from '@frontdesk/core/services';
import { ProductCategoryForNestedNav } from '../../interfaces/product-category-for-nested-nav';
import { CategoryListComponent } from '../category-list/category-list.component';
import { ProductCategoryAndProduct } from '../../interfaces/product-category-and-product';
import { ProductForGridItem } from '../../interfaces/product-for-grid-item';
import { StateList } from '@frontdesk/core/constants/product-constant';
import { ProductCategoryForGridItem } from '../../interfaces/product-category-for-grid-item';
import { getProductUrlByName } from '@frontdesk/core/utils/product-utils';

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild(CategoryListComponent) categoriesComponent: CategoryListComponent;

  routerUrl: string;
  allCategories: ProductCategoryForNestedNav[];
  categories: GridListItem[];
  products: GridListItem[];

  private readonly baseUrl = '/products/';
  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.routerUrl = event.url.split('#')[0];
        if (this.routerUrl.includes(this.baseUrl)) {
          const categoryPath = this.routerUrl.split(this.baseUrl).filter((x, i) => i > 0).join('');
          switch (categoryPath) {
            case this.categoriesComponent.newProducts.path:
            case this.categoriesComponent.legacyProducts.path:
              this.loadProductsByState(categoryPath);
              break;
            default:
              this.loadCategoriesAndProductsByPath(categoryPath);
              break;
          }
        } else if (this.routerUrl.includes('/support/legacy')) {
          this.loadProductsByState('legacy');
        } else {
          this.router.navigate(['new'], { relativeTo: this.route });
        }
      });
  }

  ngOnInit() {
    this.loadProductCategories();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProductCategories() {
    this.vvtkApiService.get<ProductCategoryForNestedNav[]>({
      path: 'api/Product/Categories'
    }).subscribe(
      data => {
        this.allCategories = data;
      }
    );
  }

  private loadProductsByState(state: string) {
    this.vvtkApiService.get<ProductForGridItem[]>({
      path: `api/Products`,
      query: `state=${state}`
    }).subscribe(
      data => {
        this.categories = null;
        this.products = this.convertProductsToGridList(data);
      }
    );
  }

  private loadCategoriesAndProductsByPath(path: string) {
    if (!this.allCategories) {
      timer(100).subscribe(() => {
        this.loadCategoriesAndProductsByPath(path);
      });
      return;
    }
    try {
      const categoryId = this.getCategoryIdByPath(this.allCategories, path);
      this.loadCategoriesAndProductsById(categoryId);
    } catch (error) {
      const lang = this.route.snapshot.data.lang || '';
      this.router.navigate([lang, 'support', 'legacy'], { relativeTo: this.route.root });
    }
  }

  private getCategoryIdByPath(categories: ProductCategoryForNestedNav[], path: string) {
    const paths = path.split('/');
    const category = categories.find(x => x.subRoute === paths[0]);
    if (category) {
      if (paths.length >= 2 && (category.children || []).length) {
        const subPaths = paths.filter((value, index) => index > 0).join('/');
        return this.getCategoryIdByPath(category.children, subPaths);
      } else {
        return category.id;
      }
    } else {
      throw new Error('category not found!');
    }
  }

  private loadCategoriesAndProductsById(categoryId: number) {
    this.vvtkApiService.get<ProductCategoryAndProduct>({
      path: `api/Products/Category/${categoryId}/Children`
    }).subscribe(
      data => {
        this.categories = this.convertCategoriesToGridList(data.categories);
        this.products = this.convertProductsToGridList(data.products);
      }
    );
  }

  private convertCategoriesToGridList(categories: ProductCategoryForGridItem[]): GridListItem[] {
    return categories.map(item => {
      return {
        title: item.name,
        url: item.url || this.getCategoryUrlByRoute(item.subRoute),
        src: item.image && item.image.imagePath,
        alt: item.image && item.image.name
      };
    });
  }

  private convertProductsToGridList(products: ProductForGridItem[]): GridListItem[] {
    return products.map(item => {
      return {
        title: item.name,
        subtitle: item.shortDescription,
        url: item.url || getProductUrlByName(item.name, this.route.snapshot.data.lang),
        src: item.image && item.image.imagePath,
        alt: item.image && item.image.name,
        labels: this.getLabelsByState(item.state)
      };
    });
  }

  private getCategoryUrlByRoute(route: string) {
    if (route) {
      return `/${this.routerUrl}/${route}`;
    }
  }

  private getLabelsByState(state: number) {
    return StateList
      .filter(x => x.value === state)
      .map(x => {
        return {
          text: x.labelText,
          color: x.color,
          bgColor: x.bgColor
        };
      });
  }

}
