import { Component, OnInit } from '@angular/core';
import { VvtkService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-working-at-vivotek',
  templateUrl: './working-at-vivotek.component.html',
  styleUrls: ['./working-at-vivotek.component.scss']
})
export class WorkingAtVivotekComponent implements OnInit {
  _Content = { content: '' };

  constructor(private vvtkService: VvtkService) { }

  ngOnInit() {
    this.vvtkService.getCareers('Working', undefined, resp => {
      this._Content = resp.json() ? resp.json() : this._Content;
    });
  }
}
