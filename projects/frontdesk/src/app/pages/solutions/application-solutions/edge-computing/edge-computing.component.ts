import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-edge-computing',
  templateUrl: './edge-computing.component.html',
  styleUrls: ['./edge-computing.component.scss']
})
export class EdgeComputingComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/EdgeComputing'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20EdgeComputing');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
