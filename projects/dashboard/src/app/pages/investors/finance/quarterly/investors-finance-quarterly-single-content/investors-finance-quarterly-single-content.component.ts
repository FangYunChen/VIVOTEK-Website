import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewPageContentComponent } from '../../../../../shared/components/review-page/review-page-content/review-page-content.component';

@Component({
  selector: 'vvtk-investors-finance-quarterly-single-content',
  templateUrl: './investors-finance-quarterly-single-content.component.html'
})
export class InvestorsFinanceQuarterlySingleContentComponent implements OnInit {
  @ViewChild('reviewContent') reviewContent: ReviewPageContentComponent;

  opts = {
    title: '單一公司財務季報表',
    hasContent: false,
    hasTemplate: false,
    hasSheet: false,
    hasFile: true,
    dirPath: 'Investors/Finance/Quarterly/Single',
    routerPath: '/investors/finance/quarterly/single',
    parentPath: '/investors/finance/quarterly/single',
    parentQuery: null,
    apis: {
      getReviewers: '/investors/finance/quarterly/single/0/0/content/review',
      getStatus: 'api/Finance/Quarterly/Single/Status',
      publish: 'api/Finance/Quarterly/Single/Publish',
      draft: 'api/Finance/Quarterly/Single/Draft',
      review: 'api/Finance/Quarterly/Single/Review'
    }
  };

  year: number;
  quarterly: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const routeParams$ = this.route.params.subscribe(params => {
      this.year = +params['year'];
      this.quarterly = +params['quarterly'];
      this.setOpts();

      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  setOpts() {
    this.opts.title = `單一公司財務季報表(${this.year} Q${this.quarterly})`;
    this.opts.routerPath = `/investors/finance/quarterly/single/${this.year}/${
      this.quarterly
    }`;
    this.opts.parentPath = `/investors/finance/quarterly/single`;
    this.opts.parentQuery = {
      year: this.year,
      quarterly: this.quarterly
    };
    this.opts.apis.getStatus = `api/Finance/Quarterly/Single/Status/${
      this.year
    }/${this.quarterly}`;
    this.opts.apis.publish = `api/Finance/Quarterly/Single/Publish/${
      this.year
    }/${this.quarterly}`;
    this.opts.apis.draft = `api/Finance/Quarterly/Single/Draft/${this.year}/${
      this.quarterly
    }`;
    this.opts.apis.review = `api/Finance/Quarterly/Single/Review/${this.year}/${
      this.quarterly
    }`;
    this.reviewContent.setOpts(this.opts);
  }
}
