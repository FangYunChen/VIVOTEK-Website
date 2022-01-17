import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {
  opts: TemplatePageOption = {
    title: 'Downloads',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'api/LandingPages/Downloads',
    apis: {
      get: 'api/LandingPages/Downloads',
      patch: 'api/LandingPages/Downloads'
    }
  };

  constructor() {}

  ngOnInit() {}
}
