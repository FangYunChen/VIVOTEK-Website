import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-multi-site-management',
  templateUrl: './multi-site-management.component.html',
  styleUrls: ['./multi-site-management.component.scss']
})
export class MultiSiteManagementComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/MultiSiteManagement'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Multi%20Site%20Management');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
