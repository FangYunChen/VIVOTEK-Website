import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-about-overview',
  templateUrl: './about-overview.component.html'
})
export class AboutOverviewComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Who We Are - Overview',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'About/Overview',
    apis: {
      get: 'api/Overview',
      patch: 'api/Overview'
    }
  };

  constructor() { }

  ngOnInit() { }
}
