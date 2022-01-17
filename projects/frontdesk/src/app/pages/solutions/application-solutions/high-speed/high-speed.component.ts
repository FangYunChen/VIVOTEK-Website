import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-high-speed',
  templateUrl: './high-speed.component.html',
  styleUrls: ['./high-speed.component.scss']
})
export class HighSPeedComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/HighSpeed'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20High-Speed');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
