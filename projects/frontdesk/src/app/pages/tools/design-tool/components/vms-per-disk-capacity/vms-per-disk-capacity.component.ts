import { Component, OnInit } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-vms-per-disk-capacity',
  templateUrl: './vms-per-disk-capacity.component.html',
  styleUrls: ['./vms-per-disk-capacity.component.scss']
})
export class VmsPerDiskCapacityComponent implements OnInit {
  get volumeGroupNumber() {
    return Math.ceil(
      this.designToolProductService.totalRecordingBandwidth / 200
    );
  }

  get volumeGroupNeed() {
    return Math.ceil(
      this.designToolProductService.totalStorage /
        (1024 * 1024) /
        this.volumeGroupNumber /
        (this.designToolService.vmsValue * 1000 * 1000 * 1000 / 1024 / 1024 / 1024)
    );
  }

  get totalDisks() {
    return this.volumeGroupNeed * this.volumeGroupNumber;
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
