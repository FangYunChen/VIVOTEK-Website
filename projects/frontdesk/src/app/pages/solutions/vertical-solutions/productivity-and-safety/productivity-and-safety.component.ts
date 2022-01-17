import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-productivity-and-safety',
  templateUrl: './productivity-and-safety.component.html',
  styleUrls: ['./productivity-and-safety.component.scss']
})
export class ProductivityAndSafetyComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/ProductivityAndSafety'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Productivity%20And%20Safety');
      } else {
        this._Content = result || this._Content;
      }
    });
  }
}
