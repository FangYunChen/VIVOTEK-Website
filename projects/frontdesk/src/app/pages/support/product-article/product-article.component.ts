import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductArticleService } from './product-article.service';
import { SupportArticleType } from '@frontdesk/core/constants/support-article-constant';
import { Observable } from 'rxjs';
import { SupportCategory } from '@frontdesk/core/interfaces/support-article';
import { tap, map } from 'rxjs/operators';
import { SupportBreadcrumbService } from '../support-breadcrumb.service';

@Component({
  selector: 'vvtk-product-article',
  templateUrl: './product-article.component.html',
  styleUrls: ['./product-article.component.scss']
})
export class ProductArticleComponent implements OnInit, OnDestroy {

  tabs = [
    {
      title: 'Tutorials & FAQ',
      articleType: SupportArticleType.Article,
      path: 'tutorials-and-faq'
    },
    {
      title: 'Video Tutorials',
      articleType: SupportArticleType.Video,
      path: 'video-tutorials'
    }
  ];
  menuOpen = false;
  menu$: Observable<SupportCategory[]>;

  productRoute: string;
  tabTypeRoute: string;
  tabNavigateRoute: string;

  get categoryId() {
    return this.productArticleService.selectedCategoryId;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productArticleService: ProductArticleService,
    private supportBreadcrumbService: SupportBreadcrumbService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.productRoute = p.product;
      this.tabTypeRoute = p.tabType;
      this.getData(p.product);
    });
    this.tabNavigateRoute = `${this.router.url.split('/support/')[0]}/support/${this.productRoute}`;
  }

  selectItem(id: number) {
    this.productArticleService.selectItem(id);
    this.navigateToListPage();
  }

  navigateToListPage() {
    const navigateRoute = `${this.tabNavigateRoute}/${this.tabTypeRoute}`;
    this.router.navigateByUrl(navigateRoute);
  }

  getData(productRoute: string) {
    const articleType = this.tabs.find(x => x.path === this.tabTypeRoute).articleType;
    this.productArticleService.getArticlesByProduct(productRoute, articleType);
    this.productArticleService.getProductByRoute(productRoute);
    this.menu$ = this.productArticleService.product$.pipe(
      tap(p => this.supportBreadcrumbService.contentPageTitle = p.name),
      map(p => ([...p.categories])),
      tap(p => {
        if (p.length > 0) {
          this.selectItem(p[0].id);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.supportBreadcrumbService.clearBreadcrumbValue();
  }

}
