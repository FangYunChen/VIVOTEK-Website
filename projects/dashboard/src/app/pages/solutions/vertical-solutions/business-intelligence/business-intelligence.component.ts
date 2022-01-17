import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-security',
  templateUrl: './business-intelligence.component.html'
})
export class BusinessIntelligenceComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Vertical Solutions - Business Intelligence Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/VerticalSolutions/BusinessIntelligence',
    apis: {
      get: 'api/Solutions/BusinessIntelligence',
      patch: 'api/Solutions/BusinessIntelligence'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
