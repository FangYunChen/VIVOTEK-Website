import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Smart Vca Support List - Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Learning/SmartVca/SupportPage',
    apis: {
      get: 'api/Products/SmartVca/SupportPage',
      patch: 'api/Products/SmartVca/SupportPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
