import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-shareholder-list',
  templateUrl: './shareholder-list.component.html',
  styleUrls: ['./shareholder-list.component.scss']
})
export class ShareholderListComponent implements OnInit {
  _Content = { content: '', sheet: { title: '' } };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('shareholder-list', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
      this._Content.sheet =
        typeof resp.json().sheet === 'string'
          ? JSON.parse(resp.json().sheet)
          : this._Content.sheet;
    });
  }
}
