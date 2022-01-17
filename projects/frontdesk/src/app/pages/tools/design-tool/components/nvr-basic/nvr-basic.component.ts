import { Component, OnInit } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolNvrInfo } from '../../interface/design-tool-nvr-info';
import { DesignToolProductService } from '../../design-tool-product.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'vvtk-nvr-basic',
  templateUrl: './nvr-basic.component.html',
  styleUrls: ['./nvr-basic.component.scss']
})
export class NvrBasicComponent implements OnInit {
  nvrList: Array<DesignToolNvrInfo>;

  get nvrRecommendations(): Array<string> {
    if (
      this.designToolService.basicNvr.recordingThroughput !== undefined &&
      this.designToolService.basicNvr.hddMaxCapacity !== undefined
    ) {
      this.changeRecommendations();
      return [
        `${this.designToolService.basicNvr.model} x ${this.designToolService.basicNvr.qty} pcs`
      ];
    }
  }

  constructor(
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {
    this.designToolService
      .getNvrList()
      .subscribe(data => (this.nvrList = data.filter(x => x.Name)));
  }

  ChangeNvr() {
    const tmp = this.nvrList
      .filter(nvr => nvr.Name === this.designToolService.basicNvr.model)
      .pop();
    this.designToolService.basicNvr = {
      model: tmp.Name,
      hddDevices: tmp.HddDevices,
      hddMaxCapacity: tmp.HddMaxCapacity,
      maximumChanel: tmp.Channel,
      recordingThroughput: tmp.RecordingThroughput,
      networkThroughput: tmp.NetworkThroughput,
      SelectedHDDCapacity: tmp.SelectedHDDCapacity
    };
    this.changeRecommendations();
  }

  changeRecommendations() {
    const productList = this.designToolProductService.productList;
    const totalQty = productList
      .filter(product => product.isRecording)
      .map(product => product.qty)
      .reduce((total, num) => total + num, 0);
    const totalBandwidth = productList
      .map(product => product.qty * product.recordingBandwidth)
      .reduce((total, num) => total + num, 0);
    const totalStorage = productList
      .map(product => (product.qty * product.storage) / 1024 / 1024)
      .reduce((total, num) => total + num, 0);
    const qtyCount = Math.ceil(
      totalQty / +this.designToolService.basicNvr.maximumChanel
    );
    const bandwidth = +this.designToolService.basicNvr.recordingThroughput.replace(
      'Mbps',
      ''
    );
    const bandwidthCount = Math.ceil(totalBandwidth / bandwidth);
    const storage = this.getHddMaxCapacity(
      this.designToolService.basicNvr.hddMaxCapacity
    ) * this.gethddDevices(this.designToolService.basicNvr.hddDevices);
    const storageCount = Math.ceil(totalStorage / storage);
    this.designToolService.basicNvr.qty = Math.max(
      qtyCount,
      bandwidthCount,
      storageCount
    );
  }

  getHddMaxCapacity(value: string): number {
    let result: number;
    const tmp = value.replace('TB', '');
    result = +tmp;
    if (isNaN(result)) {
      const tmp2 = tmp.split('x');
      result = +tmp2[0] * +tmp2[1];
    }
    return result;
  }

  gethddDevices(value: string): number {
    let result: number;
    result = +value;
    if (isNaN(result)) {
      result = 1;
    }
    return result;
  }
}
