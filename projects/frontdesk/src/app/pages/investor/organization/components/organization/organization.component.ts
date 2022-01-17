import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services/vvtk.service';

@Component({
  selector: 'vvtk-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  _Content = { content: '', sheet: { title: '' } };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('architecture', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
      this._Content.sheet =
        typeof resp.json().sheet === 'string'
          ? JSON.parse(resp.json().sheet)
          : this._Content.sheet;
    });
  }
}
