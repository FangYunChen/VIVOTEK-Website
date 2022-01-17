import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-cloud-based',
  templateUrl: './cloud-based.component.html'
})
export class CloudBasedComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Cloud-based Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/CloudBased',
    apis: {
      get: 'api/Solutions/CloudBased',
      patch: 'api/Solutions/CloudBased'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
