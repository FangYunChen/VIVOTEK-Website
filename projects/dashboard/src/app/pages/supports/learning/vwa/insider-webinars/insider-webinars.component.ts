import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-insider-webinars',
  templateUrl: './insider-webinars.component.html'
})
export class InsiderWebinarsComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - Insider Webinars',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/InsiderWebinars',
    apis: {
      get: 'api/Supports/Learning/InsiderWebinars',
      patch: 'api/Supports/Learning/InsiderWebinars'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
