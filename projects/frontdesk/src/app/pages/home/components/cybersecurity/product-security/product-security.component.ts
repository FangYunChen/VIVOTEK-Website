import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-product-security',
  templateUrl: './product-security.component.html',
  styleUrls: ['./product-security.component.scss']
})
export class ProductSecurityComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Supports/ProductSecurity'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Product%20Security');
      } else {
        this._Content = result || this._Content;
      }
    });
  }
}
