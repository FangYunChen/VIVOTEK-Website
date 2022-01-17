import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vec',
  templateUrl: './vec.component.html'
})
export class VECComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - VWA - VEC',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/VWA/VEC',
    apis: {
      get: 'api/Supports/Learning/VWA/VEC',
      patch: 'api/Supports/Learning/VWA/VEC'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
