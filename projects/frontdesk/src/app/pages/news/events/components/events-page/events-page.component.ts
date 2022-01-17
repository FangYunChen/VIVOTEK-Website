import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { NewsEventsPage } from '@frontdesk/core/classes/news/news-events-page';
import { Collection } from '@frontdesk/core/collection.enum';
import {
  VvtkService,
  PageMetaService
} from '@frontdesk/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  id: any;
  routeParamsSub$: Subscription;
  title: string;
  _Content: NewsEventsPage;

  public collection = Collection;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private route: ActivatedRoute,
    private router: Router,
    private pageMetaService: PageMetaService
  ) { }

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
        path: `api/Event/${this.id}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            if (data) {
              this._Content = data;
              this.addBreadcrumbs(this._Content.title);
              if (this._Content.status !== 1) {
                this.router.navigate([
                  this.pageMetaService.getCustomPath('/404')
                ]);
              }
            }
          }
        },
        error: error => {
          console.error('An error occurred in getNewsPage & NewsEvents', error);
          // TODO: 要做 跳到 找不到這個頁面 之後跳回第一頁新聞列表的功能
        }
      }
    );
  }

  addBreadcrumbs(title: string) {
    this.title = title;
  }
}
