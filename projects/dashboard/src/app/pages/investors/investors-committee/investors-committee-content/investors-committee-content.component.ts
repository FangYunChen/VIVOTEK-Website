import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-committee-content',
  templateUrl: './investors-committee-content.component.html'
})
export class InvestorsCommitteeContentComponent implements OnInit {
  opts = {
    title: '薪酬委員會',
    hasContent: false,
    hasTemplate: true,
    hasSheet: true,
    dirPath: 'Investors/Committee',
    routerPath: '/investors/committee',
    parentPath: '/investors/committee',
    apis: {
      getReviewers: '/investors/committee/content/review',
      getStatus: 'api/Committee/Status',
      publish: 'api/Committee/Publish',
      draft: 'api/Committee/Draft',
      review: 'api/Committee/Review'
    }
  };

  constructor() {}

  ngOnInit() {}
}
