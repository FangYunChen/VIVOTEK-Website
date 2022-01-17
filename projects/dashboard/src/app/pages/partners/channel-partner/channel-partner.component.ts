import { Component, OnInit } from '@angular/core';
import { TemplatePageOption } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-channel-partner',
  templateUrl: './channel-partner.component.html'
})
export class ChannelPartnerComponent implements OnInit {

  opts: TemplatePageOption = {
    title: 'Partners - Channel-Partner',
    hasContent: false,
    hasTemplate: true,
    hasSheet: false,
    dirPath: 'Partners/PartnersChannel',
    apis: {
      get: 'api/Partners/PartnersChannel',
      patch: 'api/Partners/PartnersChannel'
    }
  };

  constructor() { }

  ngOnInit() {
  }

}
