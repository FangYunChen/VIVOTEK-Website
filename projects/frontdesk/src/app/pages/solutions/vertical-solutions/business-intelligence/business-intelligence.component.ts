import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-security',
  templateUrl: './business-intelligence.component.html',
  styleUrls: ['./business-intelligence.component.scss']
})
export class BusinessIntelligenceComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/BusinessIntelligence'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Business%20Intelligence');
      } else {
        this._Content = result || this._Content;
      }
    });
  }
}
