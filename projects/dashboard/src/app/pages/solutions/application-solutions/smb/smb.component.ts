import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-smb',
  templateUrl: './smb.component.html'
})
export class SMBComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Application Solutions - SMB Solution',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Solutions/ApplicationSolutions/SMB',
    apis: {
      get: 'api/Solutions/SMB',
      patch: 'api/Solutions/SMB'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
