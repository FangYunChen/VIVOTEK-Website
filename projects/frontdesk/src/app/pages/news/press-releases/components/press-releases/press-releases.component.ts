import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { CardsItemsNewsReleases } from '@frontdesk/core/classes';
import { VvtkService, I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-press-releases',
  templateUrl: './press-releases.component.html',
  styleUrls: ['./press-releases.component.scss']
})
export class PressReleasesComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  tabsActive = 'year2017';
  yearList$: number[] = [];

  isLoading = false;

  bannerCount = 3;
  loadMoreCount = 12;

  _bannerItem: CardsItemsNewsReleases[] = [];
  _cardsItems: CardsItemsNewsReleases[] = [];

  loadMoreQueue: {
    dataLimit: number;
    dataYear: string;
    completeCallback: (cardsItems) => void;
  }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private datepipe: DatePipe,
    public i18nService: I18nService
  ) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/News/Years',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const yearList: number[] = resp.json();
            if (yearList.length > 0) {
              this.yearList$ = yearList;
              this.tabsActive =
                'year' + this.yearList$[this.yearList$.length - 1];

              this.vvtkService.get(
                {
                  path: 'api/News/List',
                  disableLanguage: false,
                  query: `data.sort=desc&data.limit=${
                    this.bannerCount
                  }&data.order=publishAt`
                },
                {
                  next: response => {
                    if (response.ok) {
                      const data = response.json();
                      if (data && data.list && data.list.length > 0) {
                        const items = data.list;
                        this.bannerCallback(items);
                      }
                    }
                  },
                  error: err => {},
                  complete: () => {
                    this.enqueueLoadMore(this.cardCallback);

                    this.dequeueLoadMore();
                  }
                }
              );
            }
          }
        },
        complete: () => {
          this.initLoadMore();
        }
      }
    );
  }

  initLoadMore() {
    if (this.isBrowser) {
      document.body.onscroll = $event => {
        const outerWrapHeight = $('.outerWrap').outerHeight(true);
        const bodyHeight = $('body').height();
        const bodyscrollTop = $('body').scrollTop();

        if (Math.floor(outerWrapHeight - bodyHeight) === bodyscrollTop) {
          if (!this.isLoading) {
            this.enqueueLoadMore(this.cardCallback);
            this.dequeueLoadMore();
          }
        }
      };
    }
  }

  enqueueLoadMore(
    callback: (cardItems) => void = null,
    limit: number = this.loadMoreCount,
    year: string = this.tabsActive.replace('year', '')
  ) {
    this.loadMoreQueue.push({
      dataLimit: limit,
      dataYear: year,
      completeCallback: callback
    });
  }

  dequeueLoadMore(continueDequeue: boolean = false) {
    if (this.isLoading && !continueDequeue) {
      return;
    } else {
      if (this.loadMoreQueue.length > 0) {
        this.isLoading = true;

        const param: {
          dataLimit: number;
          dataYear: string;
          completeCallback: (cardsItems) => void;
        } = this.loadMoreQueue.shift();

        let nowLimit = 0;

        nowLimit += this._bannerItem.filter(
          item => item.publishAt.getFullYear().toString() === param.dataYear
        ).length;

        nowLimit += this._cardsItems.filter(
          item => item.publishAt.getFullYear().toString() === param.dataYear
        ).length;

        this.vvtkService.get(
          {
            path: 'api/News/List',
            disableLanguage: false,
            query: `data.sort=desc&data.limit=${
              param.dataLimit
            }&data.order=publishAt&data.start=${nowLimit}&data.year=${
              param.dataYear
            }`
          },
          {
            next: resp => {
              if (resp.ok) {
                const data = resp.json();
                if (data && data.list && data.list.length > 0) {
                  const items = data.list;
                  this.cardCallback(items);
                }
              }
            },
            error: err => {},
            complete: () => {
              this.dequeueLoadMore(true);
            }
          }
        );
      } else {
        this.isLoading = false;
      }
    }
  }

  bannerCallback(items: CardsItemsNewsReleases[]) {
    items.forEach(ele => {
      ele.publishAt = new Date(ele.publishAt);
      this._bannerItem.push(ele);
    });
  }

  cardCallback(items: CardsItemsNewsReleases[]) {
    items.forEach(ele => {
      ele.publishAt = new Date(ele.publishAt);
      this._cardsItems.push(ele);
    });
  }

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
    this.enqueueLoadMore(this.cardCallback);
    this.dequeueLoadMore();
  }
}
