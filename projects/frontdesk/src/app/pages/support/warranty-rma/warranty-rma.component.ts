import { Component, OnInit } from '@angular/core';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-warranty-rma',
  templateUrl: './warranty-rma.component.html',
  styleUrls: ['./warranty-rma.component.scss']
})
export class WarrantyRmaComponent implements OnInit {
  _Content = { templates: [{ type: 0 }] };

  constructor(private vvtkApiService: VvtkApiService) { }

  ngOnInit() {
    this.vvtkApiService.get({
      path: 'api/Support/WarrantyRMA'
    }).subscribe(result => this._Content = result || this._Content);
  }
}
