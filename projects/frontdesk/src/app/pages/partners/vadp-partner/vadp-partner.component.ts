import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-vadp-partner',
  templateUrl: './vadp-partner.component.html',
  styleUrls: ['./vadp-partner.component.scss']
})
export class VADPPartnerComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Partners/SIAProgram/VADP/VADPPartner'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
