import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-cybersecurity-management',
  templateUrl: './cybersecurity-management.component.html',
  styleUrls: ['./cybersecurity-management.component.scss']
})
export class CybersecurityManagementComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Supports/CybersecurityManagement'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Cybersecurity%20Management');
      } else {
        this._Content = result || this._Content;
      }
    });
  }
}
