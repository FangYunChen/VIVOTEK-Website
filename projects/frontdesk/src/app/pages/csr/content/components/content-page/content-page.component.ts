import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VvtkService, I18nService } from '@frontdesk/core/services';
import { ContentService } from '../../content.service';
import { catchError, finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { CardsItemCSRActivity } from '@frontdesk/core/classes/cards/cards-item-csr-activity';

@Component({
  selector: 'vvtk-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  pageId: number;

  page: {
    id: number;
    categoryId: number;
    title: string;
    content: string;
    templates: string[];
  } = {
    id: 0,
    categoryId: 0,
    title: '',
    content: '',
    templates: []
  };

  routeParamsSub$: Subscription;
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  activeYear: number;
  yearList$: number[] = [];
  _cardsItems: CardsItemCSRActivity[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private contentService: ContentService,
    public i18nService: I18nService
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
        this.pageId = params['id'] || this.route.snapshot.data['id'];
        if (this.pageId) {
          this.contentService.setPageId(this.pageId);
          this.vvtkService.get(
            {
              path: `api/CSR/Page/${this.pageId}`,
              disableLanguage: false
            },
            {
              next: resp => {
                this.page = resp.json();
                this.contentService.setPageTitle(this.page.title);
              }
            }
          );
        }
      });
      this.vvtkService.get(
        {
          path: 'api/CSRActivities/Years',
          disableLanguage: true
        },
        {
          next: yearResp => {
            if (yearResp.ok) {
              const yearList: number[] = yearResp.json();
              if (yearList && yearList.length > 0) {
                this.yearList$ = yearList;
                this.activeYear = this.yearList$[this.yearList$.length - 1];
                this.vvtkService.get(
                  {
                    path: 'api/CSRActivities/List',
                    disableLanguage: false
                  },
                  {
                    next: resp => {
                      if (resp.ok) {
                        const data: {
                          filterTotal: number;
                          list: CardsItemCSRActivity[];
                        } = resp.json();
                        if (data.list && data.list.length > 0) {
                          data.list = data.list.sort((c1, c2) => {
                            return new Date(c1.date) < new Date(c2.date) ? 1 : -1;
                          });

                          data.list.forEach(el => {
                            el.publishAt = new Date(el.date.toString());
                            this._cardsItems.push(el);
                          });
                        }
                      }
                    }
                  }
                );
              }
            }
          }
        }
      );
  }

  tabsChange(activeYear) {
    this.activeYear = parseInt(activeYear, 0);
  }
}
