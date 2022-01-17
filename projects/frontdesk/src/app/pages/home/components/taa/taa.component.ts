import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-taa',
  templateUrl: './taa.component.html',
  styleUrls: ['./taa.component.scss']
})
export class TaaComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/LandingPages/TAA'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
