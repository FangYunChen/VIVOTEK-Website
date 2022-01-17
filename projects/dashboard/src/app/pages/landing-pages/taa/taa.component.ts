import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-taa',
  templateUrl: './taa.component.html',
  styleUrls: ['./taa.component.scss']
})
export class TaaComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'TAA - Compliant Product',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/TAA',
    apis: {
      get: 'api/LandingPages/TAA',
      patch: 'api/LandingPages/TAA'
    }
  };

  constructor() {}

  ngOnInit() {}
}
