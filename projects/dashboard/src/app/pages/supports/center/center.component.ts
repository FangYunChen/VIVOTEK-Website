import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-center',
  templateUrl: './center.component.html'
})
export class SupportCenterComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support Center',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Center',
    apis: {
      get: 'api/Supports/Center',
      patch: 'api/Supports/Center'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
