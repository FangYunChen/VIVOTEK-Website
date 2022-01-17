import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-vpe-north-america',
  templateUrl: './vpe-north-america.component.html',
  styleUrls: ['./vpe-north-america.component.scss']
})
export class VPENorthAmericaComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Supports/Learning/VWA/VPENorthAmerica'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

