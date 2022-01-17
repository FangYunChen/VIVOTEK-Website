import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-multi-sensor',
  templateUrl: './multi-sensor.component.html',
  styleUrls: ['./multi-sensor.component.scss']
})
export class MultiSensorComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Solutions/MultiSensor'
    }).subscribe(result => {
      if (result === null) {
        this.route.navigateByUrl('/404?q=Solutions%20Multiple%20Sensor');
      } else {
        this._Content = result || this._Content;
      }
    }
    );
  }
}
