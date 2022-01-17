import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-ndaa',
  templateUrl: './ndaa.component.html',
  styleUrls: ['./ndaa.component.scss']
})
export class NDAAComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/LandingPages/NDAA'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
