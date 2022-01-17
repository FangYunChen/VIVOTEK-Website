import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-sia',
  templateUrl: './sia.component.html',
  styleUrls: ['./sia.component.scss']
})
export class SIAComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Partners/SIA'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
