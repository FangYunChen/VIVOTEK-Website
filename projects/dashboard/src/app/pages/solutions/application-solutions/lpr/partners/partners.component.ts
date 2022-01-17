import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-partners',
  templateUrl: './partners.component.html'
})
export class PartnersComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Partners Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/Partner',
    apis: {
      get: 'api/Solutions/Partner',
      patch: 'api/Solutions/Partner'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
