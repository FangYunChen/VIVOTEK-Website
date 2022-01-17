import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-h265',
  templateUrl: './h265.component.html'
})
export class H265Component implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - H.265 Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/H265',
    apis: {
      get: 'api/Solutions/H265',
      patch: 'api/Solutions/H265'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
