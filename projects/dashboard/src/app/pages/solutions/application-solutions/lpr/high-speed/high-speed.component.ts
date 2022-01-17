import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-high-speed',
  templateUrl: './high-speed.component.html'
})
export class HighSpeedComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - High-Speed Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/HighSpeed',
    apis: {
      get: 'api/Solutions/HighSpeed',
      patch: 'api/Solutions/HighSpeed'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
