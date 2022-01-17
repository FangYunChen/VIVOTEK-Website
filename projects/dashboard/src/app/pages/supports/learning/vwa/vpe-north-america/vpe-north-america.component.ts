import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vpe-north-america',
  templateUrl: './vpe-north-america.component.html'
})
export class VPENorthAmericaComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Learning - VWA - VPE(North America)',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/Learning/VWA/VPENorthAmerica',
    apis: {
      get: 'api/Supports/Learning/VWA/VPENorthAmerica',
      patch: 'api/Supports/Learning/VWA/VPENorthAmerica'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
