import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { VvtkService, I18nService } from '@frontdesk/core/services';
import { CardsItemCSRActivity } from '@frontdesk/core/classes/cards/cards-item-csr-activity';

@Component({
  selector: 'vvtk-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  activeYear: number;
  yearList$: number[] = [];
  _cardsItems: CardsItemCSRActivity[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    public i18nService: I18nService
  ) { }

  ngOnInit() {
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
