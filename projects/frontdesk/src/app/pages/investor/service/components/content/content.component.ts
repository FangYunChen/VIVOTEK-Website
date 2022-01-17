import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  VvtkService,
  PageMetaService,
  I18nService
} from '@frontdesk/core/services';
import { ContentService } from '../../content.service';
import { CustomPathPipe } from '@frontdesk/shared/pipes/custom-path.pipe';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'vvtk-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);

  routeParamsSub$: Subscription;

  navOpen = false;
  navControl: boolean[] = [];

  menus: {
    name: string;
    id: number;
    displayOrder: number;
    sub: {
      pageId: number;
      customPath: string;
      title: string;
      displayOrder: number;
    }[];
  }[] = [
      {
        name: '',
        id: 0,
        displayOrder: 0,
        sub: [{ pageId: 0, customPath: '', title: '', displayOrder: 0 }]
      }
    ];

  pages: {
    id: number;
    customPath: string;
    categoryId: number;
    title: string;
    content: string;
    templates: string[];
    displayOrder: number;
  }[] = [
      {
        id: 0,
        customPath: '',
        categoryId: 0,
        title: '',
        content: '',
        templates: [''],
        displayOrder: 0
      }
    ];

  page: {
    id: number;
    customPath: string;
    categoryId: number;
    title: string;
    content: string;
    templates: string[];
  } = {
      id: 0,
      customPath: '',
      categoryId: 0,
      title: '',
      content: '',
      templates: []
    };

  pageId$: Subscription;
  pageId: number = null;
  pageTitle$: Subscription;
  pageTitle = '';

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private router: Router,
    private vvtkService: VvtkService,
    private pageMetaService: PageMetaService,
    private contentService: ContentService,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
    this.pageTitle$ = this.contentService.pageTitle$.subscribe(
      pageTitle => {
        this.pageTitle = pageTitle;
      }
    );

    this.vvtkService.get(
      {
        path: 'api/Investors/Categories/List',
        disableLanguage: false
      },
      {
        next: categoryResp => {
          if (categoryResp.ok) {
            const catregoryData: any[] = categoryResp.json();
            if (catregoryData && catregoryData.length > 0) {
              this.menus = catregoryData;
              this.vvtkService.get(
                {
                  path: 'api/Investors/Pages/List',
                  disableLanguage: false
                },
                {
                  next: listResp => {
                    if (listResp.ok) {
                      const listData: any[] = listResp.json();
                      if (listData && listData.length > 0) {
                        this.pages = listData;
                        this.menus.forEach(menu => {
                          menu.sub = this.pages
                            .filter(page => page.categoryId === menu.id)
                            .map(page => {
                              return {
                                pageId: page.id,
                                customPath: page.customPath,
                                title: page.title,
                                displayOrder: page.displayOrder
                              };
                            });
                          menu.sub = menu.sub.sort(
                            (d1, d2) => d2.displayOrder - d1.displayOrder
                          );
                        });

                        this.menus = this.menus.sort(
                          (m1, m2) => m2.displayOrder - m1.displayOrder
                        );

                        for (let i = 0; i < this.menus.length; i++) {
                          this.navControl[i] = false;
                        }

                        this.setScrollbar();

                        const custom = new CustomPathPipe(this.pageMetaService);

                        // 預設進來後自動讀取第一筆資料
                        if (!this.pageId) {
                          this.sideBar(0);
                          this.pageId = this.menus[0].sub[0].pageId;
                          const customPath = this.menus[0].sub[0].customPath;
                          // if (customPath) {
                          //   this.router.navigate([
                          //     custom.transform(
                          //       `/investor/service/${this.pageId}/${customPath}`
                          //     )
                          //   ]);
                          // } else {
                          //   this.router.navigate([
                          //     custom.transform(
                          //       `/investor/service/${this.pageId}`
                          //     )
                          //   ]);
                          // }

                        }

                        this.pageId$ = this.contentService.pageId$
                          .pipe(takeWhile(pageId => pageId > 0))
                          .subscribe(pageId => {
                            this.pageId = Number(pageId);
                            let customPath = '';
                            this.menus.forEach(x => {
                              x.sub.forEach(y => {
                                if (y.pageId === this.pageId) {
                                  customPath = y.customPath;
                                }
                              });
                            });
                            if (customPath) {
                              this.router.navigate([
                                custom.transform(
                                  `/investors/service/${this.pageId}/${customPath}`
                                )
                              ]);
                            } else {
                              this.router.navigate([
                                custom.transform(
                                  `/investor/service/${this.pageId}`
                                )
                              ]);
                            }
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

  setScrollbar() {
    if (this.isBrowser) {
      setTimeout(() => {
        (<any>$('.CustomScrollbar')).mCustomScrollbar({
          scrollbarPosition: 'outside',
          axis: 'x',
          advanced: {
            autoExpandHorizontalScroll: true
          }
        });
      }, 1);
    }
  }

  navContrl($event) {
    this.navOpen = !this.navOpen;
  }

  sideBar(idx) {
    if (!this.navControl[idx]) {
      this.navControl[idx] = true;
    } else {
      this.navControl[idx] = false;
    }
  }

  switchPage(menuId: number, idx: number) {
    const pageId = this.menus[menuId].sub[idx].pageId;
    this.page = this.pages.find(page => page.id === pageId);
    this.navOpen = false;
  }

  ngOnDestroy() {
    if (this.pageId$) {
      this.pageId$.unsubscribe();
    }
    if (this.pageTitle$) {
      this.pageTitle$.unsubscribe();
    }
  }
}
