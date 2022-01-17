import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsReleasePage } from '@frontdesk/core/classes/news/news-release-page';
import { Collection } from '@frontdesk/core/collection.enum';
import { PageMetaService, VvtkService } from '@frontdesk/core/services';
import { of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-press-releases-page',
  templateUrl: './press-releases-page.component.html',
  styleUrls: ['./press-releases-page.component.scss']
})
export class PressReleasesPageComponent implements OnInit {
  id: any;
  _Content: NewsReleasePage;

  public collection = Collection;

  routeParamsSub$: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private router: Router,
    private pageMetaService: PageMetaService,
    private title: Title
  ) {}

  ngOnInit() {
    this.routeParamsSub$ = this.route.params
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          this.routeParamsSub$.unsubscribe();
        })
      )
      .subscribe(params => {
        this.id = params['id'] || this.route.snapshot.data['id'];
      });

    this.vvtkService.get(
      {
        path: `api/News/${this.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            if (data) {
              this._Content = data;
              if (this._Content.status !== 1) {
                this.router.navigate([
                  this.pageMetaService.getCustomPath('/404')
                ]);
              }
            }
          }
        },
        error: error => {
          console.error(
            'An error occurred in getNewsPage & NewsReleases',
            error
          );
          // TODO: 要做 跳到 找不到這個頁面 之後跳回第一頁新聞列表的功能
        }
      }
    );
  }
}
