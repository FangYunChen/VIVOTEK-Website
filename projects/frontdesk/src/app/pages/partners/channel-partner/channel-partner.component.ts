import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-channel-partner',
  templateUrl: './channel-partner.component.html',
  styleUrls: ['./channel-partner.component.scss']
})
export class ChannelPartnerComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Partners/PartnersChannel'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

