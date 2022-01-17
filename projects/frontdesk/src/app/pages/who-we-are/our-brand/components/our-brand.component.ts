import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-our-brand',
  templateUrl: './our-brand.component.html',
  styleUrls: ['./our-brand.component.scss']
})
export class OurBrandComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkService.get({
      path: 'api/WhoWeAre/OurBrand'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=WhoWeAre%20OurBrand');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
