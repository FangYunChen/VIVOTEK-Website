import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewPageContentComponent } from '../../../../../shared/components/review-page/review-page-content/review-page-content.component';

@Component({
  selector: 'vvtk-investors-finance-month-content',
  templateUrl: './investors-finance-month-content.component.html'
})
export class InvestorsFinanceMonthContentComponent implements OnInit {
  @ViewChild('reviewContent') reviewContent: ReviewPageContentComponent;

  opts = {
    title: '每月營業額報告',
    hasContent: false,
    hasTemplate: true,
    hasSheet: true,
    dirPath: 'Investors/Finance/Month',
    routerPath: '/investors/finance/month',
    parentPath: '/investors/finance/month',
    parentQuery: null,
    apis: {
      getReviewers: '/investors/finance/month/0/content/review',
      getStatus: 'api/Finance/Month/Status',
      publish: 'api/Finance/Month/Publish',
      draft: 'api/Finance/Month/Draft',
      review: 'api/Finance/Month/Review'
    }
  };

  year: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const routeParams$ = this.route.params.subscribe(params => {
      this.year = +params['year'];
      this.setOpts();

      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  setOpts() {
    this.opts.title = `每月營業額報告(${this.year})`;
    this.opts.routerPath = `/investors/finance/month/${this.year}`;
    this.opts.parentPath = `/investors/finance/month`;
    this.opts.parentQuery = {
      year: this.year
    };
    this.opts.apis.getStatus = `api/Finance/Month/Status/${this.year}`;
    this.opts.apis.publish = `api/Finance/Month/Publish/${this.year}`;
    this.opts.apis.draft = `api/Finance/Month/Draft/${this.year}`;
    this.opts.apis.review = `api/Finance/Month/Review/${this.year}`;
    this.reviewContent.setOpts(this.opts);
  }
}
