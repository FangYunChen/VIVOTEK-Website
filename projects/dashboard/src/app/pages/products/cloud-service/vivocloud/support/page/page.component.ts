import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Products - VIVOCloud - Device Support List - Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Products/VIVOCloud/SupportPage',
    apis: {
      get: 'api/Products/VIVOCloud/SupportPage',
      patch: 'api/Products/VIVOCloud/SupportPage'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
