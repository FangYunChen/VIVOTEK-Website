import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-multi-site-management',
  templateUrl: './multi-site-management.component.html'
})
export class MultiSiteManagementComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - Multi Site Management Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/Vertical/MultiSiteManagement',
    apis: {
      get: 'api/Solutions/MultiSiteManagement',
      patch: 'api/Solutions/MultiSiteManagement'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
