import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-monthly-sales',
  templateUrl: './monthly-sales.component.html',
  styleUrls: ['./monthly-sales.component.scss']
})
export class MonthlySalesComponent implements OnInit {
  _Contents: {
    [year: number]: {
      templates: string[];
      sheet: string;
    };
  } = {};
  tabsActive = 'tabs2017';

  yearList: number[] = [];

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Finance/Month/Publish/Years',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const yearList: number[] = resp.json();
            this.yearList = yearList;
            this.tabsActive = 'tabs' + this.yearList[this.yearList.length - 1];
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

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
  }
}
