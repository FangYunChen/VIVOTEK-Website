import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Smart Tracking Advanced Support List - Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Learning/SmartTrackingAdvanced/SupportPage',
    apis: {
      get: 'api/Products/SmartTrackingAdvanced/SupportPage',
      patch: 'api/Products/SmartTrackingAdvanced/SupportPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
