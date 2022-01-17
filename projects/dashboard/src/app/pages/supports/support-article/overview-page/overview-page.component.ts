import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from 'projects/dashboard/src/app/vvtk-core/classes/template';

@Component({
  selector: 'vvtk-overview-page',
  templateUrl: './overview-page.component.html'
})
export class OverviewPageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support - Overview Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Support/ArticleOverviewPage',
    apis: {
      get: 'api/Support/ArticleOverviewPage',
      patch: 'api/Support/ArticleOverviewPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
