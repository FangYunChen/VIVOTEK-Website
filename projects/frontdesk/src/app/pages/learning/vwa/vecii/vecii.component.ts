import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-vecii',
  templateUrl: './vecii.component.html',
  styleUrls: ['./vecii.component.scss']
})
export class VECIIComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private router: Router) { }

  ngOnInit() {
    this.router.navigateByUrl('/learning/certification/vecii');
    this.vvtkApiService.get({
      path: 'api/Supports/Learning/VWA/VECII'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

