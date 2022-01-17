import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-cloud-based',
  templateUrl: './cloud-based.component.html',
  styleUrls: ['./cloud-based.component.scss']
})
export class CloudBasedComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/CloudBased'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
