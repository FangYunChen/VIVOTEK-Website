import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-factory-security',
  templateUrl: './factory-security.component.html',
  styleUrls: ['./factory-security.component.scss']
})
export class FactorySecurityComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/FactorySecurity'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Factory%20Security');
      } else {
        this._Content = result || this._Content;
      }
    });
  }
}
