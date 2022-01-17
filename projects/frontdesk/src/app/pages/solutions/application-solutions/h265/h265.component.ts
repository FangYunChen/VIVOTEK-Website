import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-h265',
  templateUrl: './h265.component.html',
  styleUrls: ['./h265.component.scss']
})
export class H265Component implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/H265'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
