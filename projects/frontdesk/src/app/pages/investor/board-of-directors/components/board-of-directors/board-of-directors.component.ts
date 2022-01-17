import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-board-of-directors',
  templateUrl: './board-of-directors.component.html',
  styleUrls: ['./board-of-directors.component.scss']
})
export class BoardOfDirectorsComponent implements OnInit {
  tableWidth = 0;
  _Content = { sheet: { title: '' } };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('director', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
      this._Content.sheet = resp.json().sheet
        ? JSON.parse(resp.json().sheet)
        : this._Content.sheet;
    });
  }
}
