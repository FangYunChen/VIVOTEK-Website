import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-shareholder-content',
  templateUrl: './investors-shareholder-content.component.html'
})
export class InvestorsShareholderContentComponent implements OnInit {
  opts = {
    title: '主要股東名單',
    hasContent: true,
    hasTemplate: false,
    hasSheet: true,
    dirPath: 'Investors/Shareholder',
    routerPath: '/investors/shareholder',
    parentPath: '/investors/shareholder',
    apis: {
      getReviewers: '/investors/shareholder/content/review',
      getStatus: 'api/Shareholder/Status',
      publish: 'api/Shareholder/Publish',
      draft: 'api/Shareholder/Draft',
      review: 'api/Shareholder/Review'
    }
  };

  constructor() {}

  ngOnInit() {}
}
