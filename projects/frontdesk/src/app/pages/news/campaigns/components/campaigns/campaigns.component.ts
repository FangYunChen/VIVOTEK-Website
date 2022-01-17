import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { CardsItemsNewsCampaigns } from '@frontdesk/core/classes';
import { VvtkService, I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  tabsActive: string;
  activeYear: number;
  yearList$: number[] = [];

  isLoading = false;

  bannerCount = 3;
  loadMoreCount = 12;

  _bannerItem: CardsItemsNewsCampaigns[] = [];
  _cardsItems: CardsItemsNewsCampaigns[] = [];

  loadMoreQueue: {
    dataLimit: number;
    dataYear: number;
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
        path: 'api/Campaigns/Years',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const yearList: number[] = resp.json();
            if (yearList.length > 0) {
              this.yearList$ = yearList;
              this.activeYear = this.yearList$[this.yearList$.length - 1];
              this.tabsActive = `year${
                this.yearList$[this.yearList$.length - 1]
              }`;

              this.enqueueLoadMore(this.bannerCallback, this.bannerCount, null);
              this.enqueueLoadMore(
                this.cardCallback,
                this.loadMoreCount,
                this.activeYear
              );

              this.dequeueLoadMore();
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
            this.enqueueLoadMore(
              this.cardCallback,
              this.loadMoreCount,
              this.activeYear
            );
            this.dequeueLoadMore();
          }
        }
      };
    }
  }

  enqueueLoadMore(
    callback: (cardItems) => void = null,
    limit: number,
    year: number
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

        const queueParam: {
          dataLimit: number;
          dataYear: number;
          completeCallback: (cardsItems) => void;
        } = this.loadMoreQueue.shift();

        let nowLimit = 0;

        nowLimit += this._bannerItem.filter(
          item => item.startAt.getFullYear() === queueParam.dataYear
        ).length;

        nowLimit += this._cardsItems.filter(
          item => item.startAt.getFullYear() === queueParam.dataYear
        ).length;

        const dataParam: any = {
          sort: 'desc',
          limit: queueParam.dataLimit,
          order: 'startAt',
          start: nowLimit
        };

        if (queueParam.dataYear) {
          dataParam.year = queueParam.dataYear;
        }

        this.vvtkService.get(
          {
            path: 'api/Campaigns/List',
            disableLanguage: false,
            query: this.vvtkService.serialize(dataParam)
          },
          {
            next: resp => {
              if (resp.ok) {
                const data = resp.json();
                if (data && data.list && data.list.length > 0) {
                  const items = data.list;
                  if (queueParam.completeCallback === this.cardCallback) {
                    this.cardCallback(items);
                  } else if (
                    queueParam.completeCallback === this.bannerCallback
                  ) {
                    this.bannerCallback(items);
                  }
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

  bannerCallback(items: CardsItemsNewsCampaigns[]) {
    items.forEach(ele => {
      ele.startAt = new Date(ele.startAt);
      ele.endAt = new Date(ele.endAt);
      if (ele.stickTop) {
        this._bannerItem.push(ele);
      }
    });
  }

  cardCallback(items: CardsItemsNewsCampaigns[]) {
    items.forEach(ele => {
      ele.startAt = new Date(ele.startAt);
      ele.endAt = new Date(ele.endAt);
      this._cardsItems.push(ele);
    });
  }

  tabsChange(tabsActive) {
    const numberPattern = /\d+/g;
    this.tabsActive = tabsActive;
    this.activeYear = +this.tabsActive.match(numberPattern)[0];
    this.enqueueLoadMore(
      this.cardCallback,
      this.loadMoreCount,
      this.activeYear
    );
    this.dequeueLoadMore();
  }
}
