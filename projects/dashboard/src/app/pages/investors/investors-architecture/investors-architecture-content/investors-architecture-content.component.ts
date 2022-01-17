import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vvtk-investors-architecture-content',
  templateUrl: './investors-architecture-content.component.html'
})
export class InvestorsArchitectureContentComponent implements OnInit {
  opts = {
    title: '公司架構',
    hasContent: true,
    hasTemplate: false,
    hasSheet: true,
    dirPath: 'Investors/Architecture',
    routerPath: '/investors/architecture',
    parentPath: '/investors/architecture',
    apis: {
      getReviewers: '/investors/architecture/content/review',
      getStatus: 'api/Architecture/Status',
      publish: 'api/Architecture/Publish',
      draft: 'api/Architecture/Draft',
      review: 'api/Architecture/Review'
    }
  };

  constructor() {}

  ngOnInit() {}
}
