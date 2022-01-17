import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-cybersecurity-management',
  templateUrl: './cybersecurity-management.component.html'
})
export class CybersecurityManagementComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Support - Cybersecurity Management',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Supports/CybersecurityManagement',
    apis: {
      get: 'api/Supports/CybersecurityManagement',
      patch: 'api/Supports/CybersecurityManagement'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
