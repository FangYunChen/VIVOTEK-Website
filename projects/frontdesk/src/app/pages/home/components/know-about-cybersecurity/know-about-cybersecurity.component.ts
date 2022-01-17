import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-know-about-cybersecurity',
  templateUrl: './know-about-cybersecurity.component.html',
  styleUrls: ['./know-about-cybersecurity.component.scss']
})
export class KnowAboutCybersecurityComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/LandingPages/KnowAboutCybersecurity'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
