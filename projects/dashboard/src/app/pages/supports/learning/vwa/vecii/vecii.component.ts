import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vecii',
  templateUrl: './vecii.component.html'
})
export class VECIIComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - VWA - VEC II',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/VWA/VECII',
    apis: {
      get: 'api/Supports/Learning/VWA/VECII',
      patch: 'api/Supports/Learning/VWA/VECII'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
