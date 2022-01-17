import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-wide-coverage',
  templateUrl: './wide-coverage.component.html',
  styleUrls: ['./wide-coverage.component.scss']
})
export class WideCoverageComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/WideCoverage'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Wide%20Coverage');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
