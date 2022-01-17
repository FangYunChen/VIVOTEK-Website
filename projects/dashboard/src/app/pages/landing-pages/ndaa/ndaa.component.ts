import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-ndaa',
  templateUrl: './ndaa.component.html',
  styleUrls: ['./ndaa.component.scss']
})
export class NDAAComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'NDAA',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/NDAA',
    apis: {
      get: 'api/LandingPages/NDAA',
      patch: 'api/LandingPages/NDAA'
    }
  };

  constructor() {}

  ngOnInit() {}
}
