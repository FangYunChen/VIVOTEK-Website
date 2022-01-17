import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-major-internal-policies',
  templateUrl: './major-internal-policies.component.html',
  styleUrls: ['./major-internal-policies.component.scss']
})
export class MajorInternalPoliciesComponent implements OnInit {
  _Content = { content: '', templates: [{ type: 0 }] };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getInvestor('regulations', resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
