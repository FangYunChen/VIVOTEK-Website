import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as $ from 'jquery';
import { CardsItemAwards } from '@frontdesk/core/classes';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  isLoading = false;

  // 低於此年分都歸類到這邊
  minYear = 2014;
  // minYear之前的年份要顯示的tab
  minYearTab = `~ ${this.minYear}`;
  // 載入更多數量
  loadMoreCount = 12;

  acticeTab: string;
  // tabs上顯示的年份
  tabsList: string[];
  // 實際年分
  yearList: number[];
  cardsList: {
    [year: number]: CardsItemAwards[];
  } = {};

  // 要載入的年份
  loadMoreQueue: {
    dataLimit: number;
    dataYear: number;
  }[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService
  ) { }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Awards/Years',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            this.yearList = resp.json();
            this.tabsList = this.yearList
              .filter(year => year > this.minYear)
              .map(year => year.toString());

            if (this.yearList.filter(year => year <= this.minYear).length > 0) {
              this.tabsList.unshift(this.minYearTab);
            }

            this.acticeTab = this.tabsList[this.tabsList.length - 1];
            this.enqueueLoadMore(this.acticeTab);
            this.dequeueLoadMore();
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
            this.enqueueLoadMore(this.acticeTab);
            this.dequeueLoadMore();
          }
        }
      };
    }
  }

  enqueueLoadMore(tab: string, limit: number = this.loadMoreCount) {
    const numberPattern = /\d+/g;
    const year = +tab.match(numberPattern)[0];
    this.loadMoreQueue.push({
      dataLimit: limit,
      dataYear: year
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
          dataYear: number;
        } = this.loadMoreQueue.shift();

        const dataLimit = param.dataLimit;
        let year = param.dataYear;

        if (!this.cardsList.hasOwnProperty(year)) {
          this.cardsList[year] = [];
        }

        if (year <= this.minYear) {
          if (this.cardsList[year].length > 0) {
            // minYear 之前最舊的年份
            year = Math.min(
              ...this.cardsList[year].map(card => card.year),
              year
            );
          }
          this.loadBeforeMinYear(year, dataLimit);
        } else {
          this.loadAfterMinYear(year);
        }
      } else {
        this.isLoading = false;
      }
    }
  }

  loadBeforeMinYear(year: number, limit: number = this.loadMoreCount) {
    // 看最舊的年份有幾筆
    const nowLimit = this.cardsList[this.minYear].filter(
      card => card.year === year
    ).length;

    this.vvtkService.get(
      {
        path: 'api/Awards/List',
        disableLanguage: false,
        query: `data.sort=desc&data.limit=${limit}&data.start=${nowLimit}&data.year=${year}`
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            const items: CardsItemAwards[] = data.list;
            if (items && items.length > 0) {
              items.forEach(ele => {
                ele.date = new Date(ele.year, ele.month - 1).toString();
                ele.createdAt = new Date(ele.createdAt);
                this.cardsList[this.minYear].push(ele);
              });
            }

            if (items.length !== this.loadMoreCount) {
              const yearIndex = this.yearList.indexOf(year);
              if (yearIndex > 0) {
                const prevYear = this.yearList[yearIndex - 1];
                if (limit - items.length > 0) {
                  this.enqueueLoadMore(
                    prevYear.toString(),
                    limit - items.length
                  );
                }
              }
            }

            this.cardsList[this.minYear] = this.cardsList[this.minYear].sort(
              (val1, val2) => {
                if (val1.year === val2.year) {
                  if (val1.month === val2.month) {
                    return val1.createdAt > val2.createdAt ? 1 : -1;
                  } else {
                    return val2.month - val1.month;
                  }
                } else {
                  return val2.year - val1.year;
                }
              }
            );
          }
        },
        complete: () => {
          this.dequeueLoadMore(true);
        }
      }
    );
  }

  loadAfterMinYear(year: number, limit: number = this.loadMoreCount) {
    const nowLimit = this.cardsList[year].length;
    this.vvtkService.get(
      {
        path: 'api/Awards/List',
        disableLanguage: false,
        query: `data.sort=desc&data.limit=${limit}&data.start=${nowLimit}&data.year=${year}`
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            if (data && data.list && data.list.length > 0) {
              const items: CardsItemAwards[] = data.list;
              items.forEach(ele => {
                ele.date = new Date(ele.year, ele.month - 1).toString();
                ele.createdAt = new Date(ele.createdAt);
                this.cardsList[year].push(ele);
              });
              this.cardsList[year] = this.cardsList[year].sort((val1, val2) => {
                if (val1.month > val2.month) {
                  return -1;
                } else if (val1.month < val2.month) {
                  return 1;
                }
                return val1.createdAt > val2.createdAt ? 1 : -1;
              });
            }
          }
        },
        complete: () => {
          this.dequeueLoadMore(true);
        }
      }
    );
  }

  tabsChange(tabsActive) {
    this.acticeTab = tabsActive;
    this.enqueueLoadMore(this.acticeTab);
    this.dequeueLoadMore();
  }
}
