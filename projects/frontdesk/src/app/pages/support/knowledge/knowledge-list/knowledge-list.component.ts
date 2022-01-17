import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchBarService } from '@frontdesk/shared/services/search-bar.service';
import { Subject, Observable, combineLatest } from 'rxjs';
import { takeUntil, distinctUntilChanged, share } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { SupportOverviewArticleFilterModel, SupportArticle, SupportArticleSearchResult } from '@frontdesk/core/interfaces/support-article';
import { SupportArticleOverviewType } from '@frontdesk/core/constants/support-article-constant';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { SupportBreadcrumbService } from '../../support-breadcrumb.service';

@Component({
  selector: 'vvtk-knowledge-list',
  templateUrl: './knowledge-list.component.html',
  styleUrls: ['./knowledge-list.component.scss']
})
export class KnowledgeListComponent implements OnInit, OnDestroy {

  popularArticles$: Observable<SupportArticle[]>;
  searchResult$: Observable<SupportArticleSearchResult[]>;

  searchKeyword: string;
  destroy$ = new Subject();

  constructor(
    private vvtkApiService: VvtkApiService,
    private route: ActivatedRoute,
    private searchBarService: SearchBarService,
    private supportBreadcrumbService: SupportBreadcrumbService
  ) { }

  ngOnInit() {
    this.supportBreadcrumbService.path = '/knowledge';
    this.getPopularArticles();
    const search$ = this.searchBarService.searchKeyword$.pipe(
      distinctUntilChanged(),
      share(),
      takeUntil(this.destroy$)
    );
    combineLatest(
      this.route.params,
      search$
    ).subscribe(([routeParam, keyword]: [Params, any]) => {
      if (routeParam && routeParam.tag) {
        this.searchByTag(routeParam.tag);
      } else {
        this.searchByKeyword(keyword);
      }
    });
  }

  private searchByTag(tagId) {
    // 設定searchKeyword使熱門文章不要出現
    this.searchKeyword = ' ';
    this.searchResult$ = this.vvtkApiService.post<SupportArticleSearchResult[]>({
      path: 'api/Support/Articles/Search'
    }, { tagId: tagId });
  }

  private searchByKeyword(keyword) {
    this.searchKeyword = keyword;
    if (keyword) {
      this.search(keyword);
    }
  }

  private getPopularArticles() {
    const query: SupportOverviewArticleFilterModel = {
      overviewType: SupportArticleOverviewType.Popular,
      overviewCount: 10
    };
    this.popularArticles$ = this.getArticles(query);
  }

  private getArticles(query: SupportOverviewArticleFilterModel) {
    return this.vvtkApiService.post<SupportArticle[]>({
      path: 'api/Support/Articles/Overview'
    }, query);
  }

  private search(keyword) {
    this.searchResult$ = this.vvtkApiService.post<SupportArticleSearchResult[]>({
      path: 'api/Support/Articles/Search'
    }, { keyword: keyword });
  }

  ngOnDestroy() {
    this.supportBreadcrumbService.clearBreadcrumbValue();
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
