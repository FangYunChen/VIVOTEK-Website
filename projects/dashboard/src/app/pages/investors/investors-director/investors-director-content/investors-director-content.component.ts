import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-director-content',
  templateUrl: './investors-director-content.component.html'
})
export class InvestorsDirectorContentComponent implements OnInit {
  opts = {
    title: '董事會',
    hasContent: false,
    hasTemplate: false,
    hasSheet: true,
    dirPath: 'Investors/Director',
    routerPath: '/investors/director',
    parentPath: '/investors/director',
    apis: {
      getReviewers: '/investors/director/content/review',
      getStatus: 'api/Director/Status',
      publish: 'api/Director/Publish',
      draft: 'api/Director/Draft',
      review: 'api/Director/Review'
    }
  };

  constructor() {}

  ngOnInit() {}
}
