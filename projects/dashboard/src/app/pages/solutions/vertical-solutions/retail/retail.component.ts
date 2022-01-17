import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-retail',
  templateUrl: './retail.component.html'
})
export class RetailComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Vertical Solutions - Retail Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/VerticalSolutions/Retail',
    apis: {
      get: 'api/Solutions/Retail',
      patch: 'api/Solutions/Retail'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
