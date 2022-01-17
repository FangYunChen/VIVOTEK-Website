import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-vadp-partner',
  templateUrl: './vadp-partner.component.html'
})
export class VADPPartnerComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'SIA Program - VADP - VADP Partner',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/SIAProgram/VADP/VADPPartner',
    apis: {
      get: 'api/Partners/SIAProgram/VADP/VADPPartner',
      patch: 'api/Partners/SIAProgram/VADP/VADPPartner'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
