import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-remuneration-committee',
  templateUrl: './remuneration-committee.component.html',
  styleUrls: ['./remuneration-committee.component.scss']
})
export class RemunerationCommitteeComponent implements OnInit {

  _Content = { templates: [{ type: 0 }], sheet: { title: '' } };
  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('committee', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
      this._Content.sheet = resp.json().sheet
        ? JSON.parse(resp.json().sheet)
        : this._Content.sheet;
    });
  }
}
