import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Products - VIVOCloud - Overview',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Products/VIVOCloud/Overview',
    apis: {
      get: 'api/Products/VIVOCloud/Overview',
      patch: 'api/Products/VIVOCloud/Overview'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
