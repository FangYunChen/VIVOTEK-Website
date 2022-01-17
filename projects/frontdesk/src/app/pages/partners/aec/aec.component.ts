import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-aec',
  templateUrl: './aec.component.html',
  styleUrls: ['./aec.component.scss']
})
export class AecComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Partners/Aec'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Partners%20Aec');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}

