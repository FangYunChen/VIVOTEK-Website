import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { ReviewPageContentComponent } from 'projects/dashboard/src/app/shared/components/review-page/review-page-content/review-page-content.component';

@Component({
  selector: 'vvtk-investors-finance-quarterly-consolidated-content',
  templateUrl:
    './investors-finance-quarterly-consolidated-content.component.html'
})
export class InvestorsFinanceQuarterlyConsolidatedContentComponent
  implements OnInit {
  @ViewChild('reviewContent') reviewContent: ReviewPageContentComponent;

  opts = {
    title: '合併財務季報表',
    hasContent: false,
    hasTemplate: false,
    hasSheet: false,
    hasFile: true,
    dirPath: 'Investors/Finance/Quarterly/Consolidated',
    routerPath: '/investors/finance/quarterly/consolidated',
    parentPath: '/investors/finance/quarterly/consolidated',
    parentQuery: null,
    apis: {
      getReviewers:
        '/investors/finance/quarterly/consolidated/0/0/content/review',
      getStatus: 'api/Finance/Quarterly/Consolidated/Status',
      publish: 'api/Finance/Quarterly/Consolidated/Publish',
      draft: 'api/Finance/Quarterly/Consolidated/Draft',
      review: 'api/Finance/Quarterly/Consolidated/Review'
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
    this.opts.title = `合併財務季報表(${this.year} Q${this.quarterly})`;
    this.opts.routerPath = `/investors/finance/quarterly/consolidated/${
      this.year
    }/${this.quarterly}`;
    this.opts.parentPath = `/investors/finance/quarterly/consolidated`;
    this.opts.parentQuery = {
      year: this.year,
      quarterly: this.quarterly
    };
    this.opts.apis.getStatus = `api/Finance/Quarterly/Consolidated/Status/${
      this.year
    }/${this.quarterly}`;
    this.opts.apis.publish = `api/Finance/Quarterly/Consolidated/Publish/${
      this.year
    }/${this.quarterly}`;
    this.opts.apis.draft = `api/Finance/Quarterly/Consolidated/Draft/${
      this.year
    }/${this.quarterly}`;
    this.opts.apis.review = `api/Finance/Quarterly/Consolidated/Review/${
      this.year
    }/${this.quarterly}`;
    this.reviewContent.setOpts(this.opts);
  }
}
