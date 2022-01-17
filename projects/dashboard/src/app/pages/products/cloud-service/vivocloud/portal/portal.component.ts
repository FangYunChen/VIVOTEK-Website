import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-portal',
  templateUrl: './portal.component.html'
})
export class PortalComponent implements OnInit {

  opts: TemplatePageOption = {
    // route from portal to retail(have chance to change)
    title: 'Products - VIVOCloud - Retail',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Products/VIVOCloud/Portal',
    apis: {
      get: 'api/Products/VIVOCloud/Portal',
      patch: 'api/Products/VIVOCloud/Portal'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
