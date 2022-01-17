import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-vwa',
  templateUrl: './vwa.component.html',
  styleUrls: ['./vwa.component.scss']
})
export class VWAComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Supports/Learning/VWA'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

