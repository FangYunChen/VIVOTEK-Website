import { Component, OnInit } from '@angular/core';
import { I18nPipe } from '@frontdesk/shared/pipes/i18n.pipe';
import { VvtkService, I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-quarterly-results',
  templateUrl: './quarterly-results.component.html',
  styleUrls: ['./quarterly-results.component.scss']
})
export class QuarterlyResultsComponent implements OnInit {
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
    this.i18n.transform('單一公司財務季報表'),
    this.i18n.transform('合併財務季報表')
  ];

  tabsActive: string = 'tabs' + this.tabList[0];

  constructor(
    private vvtkService: VvtkService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.vvtkService.getFinance('Quarterly_Single', resp => {
      this.Quarterly_Single = resp.json() ? resp.json() : this.Quarterly_Single;
      this.Quarterly_Single.forEach(quarterly => {
        console.log(quarterly);
        quarterly.reports = quarterly.reports.filter(
          report => report.url !== '' && report.name !== ''
        );
        console.log(quarterly);
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
  }

  tabsChange(tabsActive) {
    this.tabsActive = tabsActive;
  }
}
