import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductArticleService } from '../product-article.service';
import { Subject, Observable, combineLatest } from 'rxjs';
import { distinctUntilChanged, share, takeUntil, map, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SupportAricleContent } from '@frontdesk/core/interfaces/support-article';
import { SupportArticleType } from '@frontdesk/core/constants/support-article-constant';

@Component({
  selector: 'vvtk-product-article-list',
  templateUrl: './product-article-list.component.html',
  styleUrls: ['./product-article-list.component.scss']
})
export class ProductArticleListComponent implements OnInit, OnDestroy {

  tagNavigateRoutePrefix = '';
  articles$: Observable<SupportAricleContent[]>;
  destroy$ = new Subject();
  supportArticleType = SupportArticleType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productArticleService: ProductArticleService
  ) { }

  ngOnInit() {
    this.tagNavigateRoutePrefix = `${this.router.url.split('/support/')[0]}/support/`;
    this.articles$ = this.route.params.pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      share(),
      switchMap(() => combineLatest(
        this.productArticleService.articles$,
        this.productArticleService.selectedCategoryId$.pipe(
          distinctUntilChanged()
        )
      ).pipe(
        map(([articles, categoryId]: [SupportAricleContent[], number]) =>
          articles.filter(article => article.categories.some(c => c === categoryId))
            .map(article => this.setVideosLink(article))
        )
      ))
    );
  }

  private setVideosLink(article: SupportAricleContent) {
    if (article.videos) {
      article.videos.forEach(video => {
        if (video.link.split('v=').length > 1) {
          video.link = video.link.split('v=')[1].split('&')[0];
        }
        if (video.link.split('/v/').length > 1) {
          video.link = video.link.split('/v/')[1].split('&')[0];
        }
      });
    }
    return article;
  }

  goTop() {
    document.body.scrollTop = 0;
  }


  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }

}
