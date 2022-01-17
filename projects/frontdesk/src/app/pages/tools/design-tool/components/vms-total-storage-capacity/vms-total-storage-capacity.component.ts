import { Component, OnInit } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-vms-total-storage-capacity',
  templateUrl: './vms-total-storage-capacity.component.html',
  styleUrls: ['./vms-total-storage-capacity.component.scss']
})
export class VmsTotalStorageCapacityComponent implements OnInit {
  get keepVideos() {
    return (
      Math.ceil(
        ((this.designToolService.vmsValue * 1024 * 1024) /
          ((this.designToolProductService.totalRecordingBandwidth / 8) *
            3600 *
            24)) *
          10
      ) / 10
    );
  }

  constructor(
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {}

  vmsValueChanged() {
    this.designToolService.vmsValue =
      this.designToolService.vmsValue > 99999999
        ? 99999999
        : this.designToolService.vmsValue;
  }
}
