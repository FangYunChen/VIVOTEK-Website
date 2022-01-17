import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-stop-and-go',
  templateUrl: './stop-and-go.component.html',
  styleUrls: ['./stop-and-go.component.scss']
})
export class StopAndGoComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/StopAndGo'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20StopAndGo');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
