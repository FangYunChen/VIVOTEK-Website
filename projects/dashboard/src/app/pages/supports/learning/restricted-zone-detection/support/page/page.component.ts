import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Restricted Zone Detection Support List - Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Learning/RestrictedZoneDetection/SupportPage',
    apis: {
      get: 'api/Products/RestrictedZoneDetection/SupportPage',
      patch: 'api/Products/RestrictedZoneDetection/SupportPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
