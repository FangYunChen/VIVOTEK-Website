import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewPageComponent } from '../../../../../shared/components/review-page/review-page.component';

@Component({
  selector: 'vvtk-investors-finance-month',
  templateUrl: './investors-finance-month.component.html'
})
export class InvestorsFinanceMonthComponent implements OnInit {
  @ViewChild('review') review: ReviewPageComponent;

  opts = {
    title: '每月營業額報告',
    routerPath: '/investors/finance/month/0',
    apis: {
      get: 'api/Finance/Month/Status'
    }
  };

  year: number;
  years: number[] = [];
  constructor(private route: ActivatedRoute) {
    for (let i = 1997; i <= new Date().getFullYear() + 3; i++) {
      this.years.push(i);
    }
    this.years.reverse();
  }

  ngOnInit() {
    const routeParams$ = this.route.queryParams.subscribe(params => {
      this.year = +params['year'] || this.years[3];
      this.setOpts();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  changeYear() {
    this.setOpts();
  }

  setOpts() {
    this.opts.routerPath = `/investors/finance/month/${this.year}`;
    this.opts.apis.get = `api/Finance/Month/Status/${this.year}`;
    this.review.setOpts(this.opts);
  }
}
