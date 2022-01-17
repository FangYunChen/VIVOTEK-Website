import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-lpr',
  templateUrl: './lpr.component.html',
  styleUrls: ['./lpr.component.scss']
})
export class LPRComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/LPR'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
