import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-video-management',
  templateUrl: './video-management.component.html'
})
export class VideoManagementComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'SIA Program - VideoManagement',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/SIAProgram/VideoManagement',
    apis: {
      get: 'api/Partners/VideoManagement',
      patch: 'api/Partners/VideoManagement'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
