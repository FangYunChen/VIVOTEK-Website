import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-intelligent-vca',
  templateUrl: './intelligent-vca.component.html',
  styleUrls: ['./intelligent-vca.component.scss']
})
export class IntelligentVCAComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'IntelligentVCA',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/IntelligentVCA',
    apis: {
      get: 'api/LandingPages/IntelligentVCA',
      patch: 'api/LandingPages/IntelligentVCA'
    }
  };

  constructor() {}

  ngOnInit() {}
}
