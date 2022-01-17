import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-internal-audit',
  templateUrl: './internal-audit.component.html',
  styleUrls: ['./internal-audit.component.scss']
})
export class InternalAuditComponent implements OnInit {
  _Content = { content: '', templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('operation', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
