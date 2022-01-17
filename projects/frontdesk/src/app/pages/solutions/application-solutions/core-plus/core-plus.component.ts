import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-core-plus',
  templateUrl: './core-plus.component.html',
  styleUrls: ['./core-plus.component.scss']
})
export class CorePlusComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/CorePlus'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Core%20Plus');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
