import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewPageComponent } from '../../../../../shared/components/review-page/review-page.component';

@Component({
  selector: 'vvtk-investors-finance-quarterly-consolidated',
  templateUrl: './investors-finance-quarterly-consolidated.component.html'
})
export class InvestorsFinanceQuarterlyConsolidatedComponent implements OnInit {
  @ViewChild('review') review: ReviewPageComponent;

  opts = {
    title: '合併財務季報表',
    routerPath: '/investors/finance/quarterly/consolidated/0/0',
    apis: {
      get: 'api/Finance/Quarterly/Consolidated/Status'
    }
  };

  year: number;
  years: number[] = [];
  quarterly: number;

  constructor(private route: ActivatedRoute) {
    for (let i = 1997; i <= new Date().getFullYear() + 3; i++) {
      this.years.push(i);
    }
    this.years.reverse();
  }

  ngOnInit() {
    const routeParams$ = this.route.queryParams.subscribe(params => {
      this.year = +params['year'] || this.years[3];
      this.quarterly = +params['quarterly'] || 1;
      this.setOpts();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  changeYear() {
    this.setOpts();
  }

  changeQuarterly() {
    this.setOpts();
  }

  setOpts() {
    this.opts.routerPath = `/investors/finance/quarterly/consolidated/${
      this.year
    }/${this.quarterly}`;
    this.opts.apis.get = `api/Finance/Quarterly/Consolidated/Status/${
      this.year
    }/${this.quarterly}`;
    this.review.setOpts(this.opts);
  }
}
