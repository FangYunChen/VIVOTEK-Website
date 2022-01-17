import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-trouble-shooting',
  templateUrl: './trouble-shooting.component.html',
  styleUrls: ['./trouble-shooting.component.scss']
})
export class TroubleShootingComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Support/TroubleShooting'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
