import { Component, OnInit, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Subscription, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VvtkService, I18nService } from '@frontdesk/core/services';
import { ContentService } from '../../content.service';
import { catchError, finalize } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { I18nPipe } from '@frontdesk/shared/pipes/i18n.pipe';
import { TabSliderComponent } from '@frontdesk/shared/components/tab-slider/tab-slider.component';

@Component({
  selector: 'vvtk-content-page',
  templateUrl: './content-page.component.html',
  styleUrls: ['./content-page.component.scss']
})
export class ContentPageComponent implements OnInit {
  @ViewChild('slider1')
  slider1:TabSliderComponent;
  @ViewChild('slidery')
  slidery:TabSliderComponent;
  @ViewChild('slider2')
  slider2:TabSliderComponent;
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

  Quarterly_Single: {
    year: string;
    reports: {
      name: string;
      url: string;
    }[];
  }[] = [];

  Quarterly_Consolidated: {
    year: string;
    reports: {
      name: string;
      url: string;
    }[];
  }[] = [];

  i18n = new I18nPipe(this.i18nService);
  tabList = [
    this.i18n.transform('Parent Company Financial Reports'),
    this.i18n.transform('Consolidated Financial Reports')
  ];

  tabsActive: string = 'tabs' + this.tabList[0];

  _Contents: {
    [year: number]: {
      templates: string[];
      sheet: string;
    };
  } = {};
  tabsYActive = 'tabs2020';

  yearYList: number[] = [];

  routeParamsSub$: Subscription;
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  tableWidth = 0;
  _boardContent = { sheet: { title: '' } };

  yearSList$ = [];
  tabsSActive: string;

  shardholderContents: {
    [year: number]: {
      title: string;
      content: string;
    }[];
  } = {};

  presentationContent = '';
  presentationLinks: {
    year: number;
    links: {
      title: string;
      url: string;
    }[];
  }[] = [];

  yearCList$: number[] = [];
  tabsCActive: string;

  dividendContent: string;
  dividendSheet: any = {
    title: ''
  };

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
          //if (this.pageId != 8 && this.pageId != 10 && this.pageId != 5) {
            this.contentService.setPageId(this.pageId);
            this.vvtkService.get(
                {
                  path: `api/Investors/Page/${this.pageId}`,
                  disableLanguage: false
                },
                {
                  next: resp => {
                    this.page = resp.json();
                    this.contentService.setPageTitle(this.page.title);
                  }
                }
              );
          //}
          if (this.pageId == 5) {
            this.vvtkService.get(
              {
                path: 'api/Investors/Shareholder/Shareholder',
                disableLanguage: false
              },
              {
                next: resp => {
                  if (resp.ok) {
                    const data: {
                      year: number;
                      contents: {
                        title: string;
                        content: string;
                      }[];
                    }[] = resp.json();
                    if (data.length > 0) {
                      this.yearSList$ = Array.from(
                        new Set(data.map(element => element.year.toString()))
                      );
                      data.forEach(contents => {
                        const year = contents.year;
                        this.shardholderContents[year] = contents.contents;
                      });
                    }
                    if (this.yearSList$.length) {
                      this.tabsSActive = `year${
                        this.yearSList$[this.yearSList$.length - 1]
                      }`;
                    }
                  }
                }
              }
            );
            this.vvtkService.get(
              {
                path: 'api/Investors/Presentation',
                disableLanguage: false
              },
              {
                next: resp => {
                  if (resp.ok) {
                    const data: {
                      content: string;
                      list: {
                        year: number;
                        links: {
                          title: string;
                          url: string;
                        }[];
                      }[];
                    } = resp.json();
                    if (data.content) {
                      this.presentationContent = data.content;
                    }
                    if (data.list) {
                      this.presentationLinks = data.list;
                      this.yearCList$ = Array.from(
                        new Set(
                          this.presentationLinks.map(element => element.year).sort()
                        )
                      );
                      this.presentationLinks.forEach(links => {
                        links.links = links.links.filter(
                          link => link.url !== '' && link.title !== ''
                        );
                      });
                      this.presentationLinks = this.presentationLinks.filter(
                        list => list.links.length > 0
                      );
                    }
                    if (this.yearCList$.length > 0) {
                      this.tabsCActive = `year${
                        this.yearCList$[this.yearCList$.length - 1]
                      }`;
                    }
                  }
                }
              }
            );
          }
          if (this.pageId == 8) {
            this.vvtkService.get(
              {
                path: 'api/Investors/Shareholder/Dividend',
                disableLanguage: false
              },
              {
                next: resp => {
                  if (resp.ok) {
                    const data: {
                      content: string;
                      sheet: string;
                    } = resp.json();
                    if (data && data.content) {
                      this.dividendContent = data.content;
                    }
                    if (data && data.sheet) {
                      this.dividendSheet = JSON.parse(data.sheet);
                    }
                  }
                }
              }
            );
          }
          if (this.pageId == 14) {
            this.vvtkService.getInvestor('director', resp => {
              this._boardContent = resp.json() ? resp.json() : this._boardContent;
              this._boardContent.sheet = resp.json().sheet
                ? JSON.parse(resp.json().sheet)
                : this._boardContent.sheet;
            });
          }
          if (this.pageId == 10) {
            this.vvtkService.getFinance('Quarterly_Single', resp => {
              this.Quarterly_Single = resp.json() ? resp.json() : this.Quarterly_Single;
              this.Quarterly_Single.forEach(quarterly => {
                // console.log(quarterly);
                quarterly.reports = quarterly.reports.filter(
                  report => report.url !== '' && report.name !== ''
                );
                // console.log(quarterly);
                if (quarterly.reports && quarterly.reports.length > 0) {
                  quarterly.reports.sort((a, b) => {
                    const q1: number = +a.name.replace('Q', '');
                    const q2: number = +b.name.replace('Q', '');
                    return q2 - q1;
                  });
                }
              });
              this.Quarterly_Single = this.Quarterly_Single.filter(
                list => list.reports.length > 0
              );
            });


            this.vvtkService.getFinance('Quarterly_Consolidated', resp => {
              this.Quarterly_Consolidated = resp.json()
                ? resp.json()
                : this.Quarterly_Consolidated;
              this.Quarterly_Consolidated.forEach(quarterly => {
                quarterly.reports = quarterly.reports.filter(
                  report => report.url !== '' && report.name !== ''
                );
                if (quarterly.reports && quarterly.reports.length > 0) {
                  quarterly.reports.sort((a, b) => {
                    const q1: number = +a.name.replace('Q', '');
                    const q2: number = +b.name.replace('Q', '');
                    return q2 - q1;
                  });
                }
              });
              this.Quarterly_Consolidated = this.Quarterly_Consolidated.filter(
                list => list.reports.length > 0
              );
            });

            this.vvtkService.get(
              {
                path: 'api/Finance/Month/Publish/Years',
                disableLanguage: true
              },
              {
                next: resp => {
                  if (resp.ok) {
                    const yearList: number[] = resp.json();
                    this.yearYList = yearList;
                    this.tabsYActive = 'tabs' + this.yearYList[this.yearYList.length - 1];
                    if (yearList && yearList.length > 0) {
                      this.vvtkService.getFinance('Month', financeResp => {
                        if (financeResp.ok) {
                          const financeData: {
                            year: number;
                            sheet: string;
                            templates: any[];
                          }[] = financeResp.json();

                          financeData.forEach(finance => {
                            this._Contents[finance.year] = {
                              sheet:
                                typeof finance.sheet === 'string'
                                  ? JSON.parse(finance.sheet)
                                  : finance.sheet,
                              templates: finance.templates
                            };
                          });
                        }
                      });
                    }
                  }
                }
              }
            );
          }
        }
      });

  }

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
  }

  tabsYChange(tabsActive) {
    this.tabsYActive = tabsActive;
  }

  tabsSChange(tabsActive) {
    this.tabsSActive = tabsActive;
  }

  tabsCChange(tabsActive) {
    this.tabsCActive = tabsActive;
  }

  reload1(){
    // this.slider1.setHomeSlider();
    // this.slidery.setHomeSlider();
  }
  reload2(){
    this.slider2.setHomeSlider();
  }
}
