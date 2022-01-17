import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { SupportAricleContent } from '@frontdesk/core/interfaces/support-article';
import { Observable } from 'rxjs';

@Component({
  selector: 'vvtk-product-article-page',
  templateUrl: './product-article-page.component.html',
  styleUrls: ['./product-article-page.component.scss']
})
export class ProductArticlePageComponent implements OnInit {

  tagNavigateRoutePrefix = '';
  article: SupportAricleContent;
  article$: Observable<SupportAricleContent>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vvtkApiService: VvtkApiService
  ) { }

  ngOnInit() {
    this.tagNavigateRoutePrefix = `${this.router.url.split('/support/')[0]}/support/`;
    this.route.params.subscribe(
      p => this.getArticle(p.article)
    );
  }

  getArticle(articleRoute: string) {
    this.article$ = this.vvtkApiService.post<SupportAricleContent>({
      path: 'api/Support/Articles/BySubRoute'
    }, { subRoute: articleRoute });
  }

}
