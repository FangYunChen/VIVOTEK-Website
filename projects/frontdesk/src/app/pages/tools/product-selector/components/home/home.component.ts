import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { I18nService } from '@frontdesk/core/services';
import { ProductSelectorService } from '../../services/product-selector.service';

const BASE_ROUTER_LINK = ['tools', 'product-selector'];

@Component({
  selector: 'vvtk-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  routerUrl: string;
  baseRouterLink = ['/', ...BASE_ROUTER_LINK];
  searchKeyword: string;

  @ViewChild('searchInput') searchInput: NgModel;

  get categories$() {
    return this.productSelectorService.categories$;
  }

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private i18nService: I18nService,
    private productSelectorService: ProductSelectorService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      ).subscribe((event: NavigationEnd) => {
        this.routerUrl = event.url.split('#')[0];

        this.i18nService.selectedLanguage$.subscribe(lang => {
          const paths = event.url.split('/');
          if (lang !== paths[1]) {
            lang = '';
          }
          this.baseRouterLink = ['/', `${lang || ''}`, ...BASE_ROUTER_LINK].filter(x => x);
        });

        const baseUrl = BASE_ROUTER_LINK.join('/');
        const categoryPath = this.routerUrl.split(baseUrl).filter((x, i) => i > 0).join('');
        this.loadProductsByPath(categoryPath);
        this.productSelectorService.clearCompare();
      });
  }

  ngOnInit() {
    this.productSelectorService.loadProductCategories();
    this.listenSearchInputChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenSearchInputChange() {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.productSelectorService.searchKeyword = value;
      });
  }

  clearSearchInput() {
    this.searchKeyword = '';
  }

  private loadProductsByPath(path: string) {
    this.productSelectorService.loadProductsByPath(path).subscribe(
      success => {},
      ({ categories, error }) => {
        const firstCategory = categories.map(x => x.subRoute)[0];
        if (firstCategory) {
          this.i18nService.selectedLanguage$.subscribe(lang => {
            this.router.navigate([...this.baseRouterLink, firstCategory], { relativeTo: this.route.root });
          });
        } else {
          this.router.navigate(['/'], { relativeTo: this.route.root });
        }
      }
    );
  }

  resetAllFilter($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.clearSearchInput();
    this.productSelectorService.resetAllSelectorOptions();
  }

}
