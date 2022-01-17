import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vvtk-online-training',
  templateUrl: './online-training.component.html',
  styleUrls: ['./online-training.component.scss']
})
export class OnlineTrainingComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService, private route: Router) { }

  ngOnInit() {
    this.route.navigateByUrl('/404?q=vwa%20online-training');
    this.vvtkApiService.get({
      path: 'api/Supports/Learning/VWA/OnlineTraining'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

