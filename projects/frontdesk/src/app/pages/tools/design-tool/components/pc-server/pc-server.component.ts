import { Component, OnInit } from '@angular/core';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-pc-server',
  templateUrl: './pc-server.component.html',
  styleUrls: ['./pc-server.component.scss']
})
export class PcServerComponent implements OnInit {
  get serverNumber() {
    return Math.ceil(
      this.designToolProductService.totalRecordingBandwidth / 400
    );
  }
  constructor(private designToolProductService: DesignToolProductService) {}

  ngOnInit() {}
}
