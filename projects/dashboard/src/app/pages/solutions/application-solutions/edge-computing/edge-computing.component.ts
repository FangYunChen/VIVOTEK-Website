import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-edge-computing',
  templateUrl: './edge-computing.component.html'
})
export class EdgeComputingComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Edge Computing Landing Page',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/application-solutions/EdgeComputing',
    apis: {
      get: 'api/Solutions/EdgeComputing',
      patch: 'api/Solutions/EdgeComputing'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
