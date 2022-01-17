import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-online-training-step',
  templateUrl: './online-training-step.component.html',
  styleUrls: ['./online-training-step.component.scss']
})
export class OnlineTrainingStepComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/LandingPages/OnlineTrainingStep'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
