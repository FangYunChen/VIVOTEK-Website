import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss']
})
export class SupportCenterComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Supports/Center'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Supports%20Center');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
