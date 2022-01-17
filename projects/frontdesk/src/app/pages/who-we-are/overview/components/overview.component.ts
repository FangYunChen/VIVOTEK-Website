import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';

@Component({
  selector: 'vvtk-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getAbout('overview', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
