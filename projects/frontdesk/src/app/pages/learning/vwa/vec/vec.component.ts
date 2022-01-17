import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-vec',
  templateUrl: './vec.component.html',
  styleUrls: ['./vec.component.scss']
})
export class VECComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/404?q=vwa%20vec');
    this.vvtkApiService.get({
      path: 'api/Supports/Learning/VWA/VEC'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

