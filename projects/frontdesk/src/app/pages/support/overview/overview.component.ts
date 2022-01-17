import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { SupportArticle, SupportOverviewArticleFilterModel, SupportProduct } from '@frontdesk/core/interfaces/support-article';
import { SupportArticleOverviewType } from '@frontdesk/core/constants/support-article-constant';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LinkGalleryItem } from '@frontdesk/shared/components/link-gallery/link-gallery.component';

@Component({
  selector: 'vvtk-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  technicalBulletins$: Observable<SupportArticle[]>;
  newsUpdates$: Observable<SupportArticle[]>;
  linkGalleryData: LinkGalleryItem[];

  overviewTemplates = { templates: [] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.getTechnicalBulletins();
    this.getNewsUpdates();
    this.getSupportProducts().subscribe(x => this.linkGalleryData = x);
    this.getOverviewPage();
  }

  private getTechnicalBulletins() {
    const query: SupportOverviewArticleFilterModel = {
      overviewType: SupportArticleOverviewType.Popular,
      overviewCount: 5
    };
    this.technicalBulletins$ = this.getArticles(query);
  }

  private getNewsUpdates() {
    const query: SupportOverviewArticleFilterModel = {
      overviewType: SupportArticleOverviewType.New,
      overviewCount: 5
    };
    this.newsUpdates$ = this.getArticles(query);
  }

  private getSupportProducts() {
    return this.vvtkApiService.get<SupportProduct[]>({
      path: 'api/Support/ProductTypes',
      query: 'isDisplayOnTop=true'
    }).pipe(
      map(products => products.map(product => ({
        linkText: product.name,
        linkUrl: `${product.subRoute}/tutorials-and-faq`,
        imageUrl: product.imagePath,
        imageAlt: product.name,
        imageTitle: product.name,
      })))
    );
  }

  private getOverviewPage() {
    this.vvtkApiService.get({
      path: 'api/Support/ArticleOverviewPage'
    }).subscribe(result => this.overviewTemplates = result || this.overviewTemplates);
  }

  private getArticles(query: SupportOverviewArticleFilterModel) {
    return this.vvtkApiService.post<SupportArticle[]>({
      path: 'api/Support/Articles/Overview'
    }, query);
  }

}
