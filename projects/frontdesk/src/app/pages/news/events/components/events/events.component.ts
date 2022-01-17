import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { CardsItemsNewsEvents } from '@frontdesk/core/classes';
import { VvtkService, I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  lastHight = 0;
  tabsActive = 'year2017';

  isLoading = true;

  _cardsItems: CardsItemsNewsEvents[] = [];
  yearList$: number[] = [];
  _bannerItem: CardsItemsNewsEvents[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private datepipe: DatePipe,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Events/Years',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: number[] = resp.json();
            if (data.length > 0) {
              this.yearList$ = data;
              if (this.yearList$.length > 0) {
                // 置頂三則
                this.vvtkService.get(
                  {
                    path: 'api/Events/List',
                    disableLanguage: false,
                    query: `data.sort=asc&data.limit=3&data.order=startAt`
                  },
                  {
                    next: listResp => {
                      if (listResp.ok) {
                        const listData: {
                          filterTotal: number;
                          list: CardsItemsNewsEvents[];
                        } = listResp.json();
                        if (listData.filterTotal > 0) {
                          this._bannerItem = listData.list;
                          if (this._bannerItem.length !== 0) {
                            this._bannerItem.forEach(ele => {
                              ele.startAt = new Date(ele.startAt);
                              ele.endAt = new Date(ele.endAt);
                              ele.date =
                                this.datepipe.transform(ele.startAt, 'yMMMd') +
                                '~' +
                                this.datepipe.transform(ele.endAt, 'yMMMd');
                            });

                            // 讀取當年份置頂以外的資料
                            this.setCardsItems(
                              undefined,
                              true,
                              this.yearList$[
                                this.yearList$.length - 1
                              ].toString()
                            );
                            this.tabsActive =
                              'year' +
                              this.yearList$[this.yearList$.length - 1];
                          }
                        }
                      }
                    }
                  }
                );
              }
            }
          }
        }
      }
    );

    if (this.isBrowser) {
      document.body.onscroll = $event => {
        if (
          $('.container').offset().top + $('.container').height() <
          $(document).height() + 10
        ) {
          if (!this.isLoading && this.lastHight !== $('.container').height()) {
            this.lastHight = $('.container').height();
            this.setCardsItems();
          }
        }
      };
      setTimeout(() => {
        $('.limit').each(function () {
          const _height = $(this)
            .find('p')
            .height();
          const _limitHeight = $(this).height();
          if (_height > _limitHeight) {
            $(this).addClass('limitAfter');
          }
        });
      }, 1);
    }
  }

  setCardsItems(
    dataLimit: number = 12,
    passLoading = false,
    dataYear: string = this.tabsActive.replace('year', '')
  ) {
    if (!passLoading && this.isLoading) {
      return;
    }
    this.isLoading = true;
    let nowLimit = 0;
    this._bannerItem.forEach(element => {
      if (element.startAt.getFullYear().toString() === dataYear) {
        nowLimit += 1;
      }
    });
    this._cardsItems.forEach(element => {
      if (element.startAt.getFullYear().toString() === dataYear) {
        nowLimit += 1;
      }
    });

    this.vvtkService.get(
      {
        path: 'api/Events/List',
        disableLanguage: false,
        query: `data.sort=asc&data.limit=${dataLimit}&data.order=startAt&data.start=${nowLimit}&data.year=${dataYear}`
      },
      {
        next: resp => {
          const items = resp.json().list ? resp.json().list : [];
          items.forEach(ele => {
            ele.startAt = new Date(ele.startAt);
            ele.endAt = new Date(ele.endAt);
            this._cardsItems.push(ele);
          });
          this.isLoading = false;
        }
      }
    );
  }

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
    this.setCardsItems();
  }
}
