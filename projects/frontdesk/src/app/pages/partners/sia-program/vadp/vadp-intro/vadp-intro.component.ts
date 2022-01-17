import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-vadp-intro',
  templateUrl: './vadp-intro.component.html',
  styleUrls: ['./vadp-intro.component.scss']
})
export class VADPIntroComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Partners/SIAProgram/VADP/VADPIntro'
    }).subscribe(result => this._Content = result || this._Content);
  }
}

