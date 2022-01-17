import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-intelligent-vca',
  templateUrl: './intelligent-vca.component.html',
  styleUrls: ['./intelligent-vca.component.scss']
})
export class IntelligentVCAComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/LandingPages/IntelligentVCA'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
