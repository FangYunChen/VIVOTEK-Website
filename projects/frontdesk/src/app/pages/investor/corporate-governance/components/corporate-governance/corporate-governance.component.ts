import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-corporate-governance',
  templateUrl: './corporate-governance.component.html',
  styleUrls: ['./corporate-governance.component.scss']
})
export class CorporateGovernanceComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('manage', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
