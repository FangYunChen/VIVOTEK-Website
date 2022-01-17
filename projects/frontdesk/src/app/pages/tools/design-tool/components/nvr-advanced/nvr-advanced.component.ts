import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolNvrInfo } from '../../interface/design-tool-nvr-info';
import { DesignToolAdvancedNvrInfo } from '../../interface/design-tool-advanced-nvr-info';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-nvr-advanced',
  templateUrl: './nvr-advanced.component.html',
  styleUrls: ['./nvr-advanced.component.scss']
})
export class NvrAdvancedComponent implements OnInit, DoCheck {
  nvrList: Array<DesignToolNvrInfo>;
  qtyArr = Array.from(Array(50).keys()).map(i => i + 1);
  remainingCh = 0;
  remainingMbps = 0;
  remainingTb = 0;

  constructor(
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {
    this.designToolService
      .getNvrList()
      .subscribe(data => (this.nvrList = data.filter(x => x.Name)));
  }

  ngDoCheck() {
    if (
      this.designToolService.advancedNvrList.filter(
        nvr => nvr.recordingThroughput
      ).length > 0
    ) {
      this.changeRemaining();
    }
  }

  addNVR(index: number): void {
    this.designToolService.advancedNvrList = this.designToolService.advancedNvrList.reduce(
      (init, advancedNvr, _index) => {
        init.push(advancedNvr);
        if (_index === index) {
          init.push({ qty: 1 });
        }
        return init;
      },
      []
    );
  }

  deleteNVR(index: number): void {
    if (this.designToolService.advancedNvrList.length > 1) {
      this.designToolService.advancedNvrList = this.designToolService.advancedNvrList.filter(
        (item, idx) => idx !== index
      );
    }
    this.changeRemaining();
  }

  changeNvr(index) {
    this.designToolService.advancedNvrList = this.designToolService.advancedNvrList.reduce(
      (init, advancedNvr, _index) => {
        init.push(advancedNvr);
        if (_index === index) {
          const tmp = this.nvrList
            .filter(nvr => nvr.Name === advancedNvr.model)
            .pop();
          advancedNvr.hddDevices = tmp.HddDevices;
          advancedNvr.hddMaxCapacity = tmp.SelectedHDDCapacity[0];
          advancedNvr.hddMaxCapacity_s = tmp.HddMaxCapacity;
          advancedNvr.maximumChanel = tmp.Channel;
          advancedNvr.recordingThroughput = tmp.RecordingThroughput;
          advancedNvr.networkThroughput = tmp.NetworkThroughput;
          advancedNvr.SupportedHDDListurl = tmp.SupportedHDDListurl;
          advancedNvr.SelectedHDDCapacity = tmp.SelectedHDDCapacity;
        }
        return init;
      },
      []
    );
    this.changeRemaining();
  }

  changeRemaining() {
    this.remainingCh = 0;
    this.remainingMbps = 0;
    this.remainingTb = 0;
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

    const totalNvrChannel = this.designToolService.advancedNvrList
      .filter(nvr => nvr.maximumChanel)
      .map(nvr => nvr.qty * +nvr.maximumChanel)
      .reduce((total, num) => total + num, 0);
    const totalNvrRecordingThroughput = this.designToolService.advancedNvrList
      .filter(nvr => nvr.recordingThroughput)
      .map(nvr => nvr.qty * +nvr.recordingThroughput.replace('Mbps', ''))
      .reduce((total, num) => total + num, 0);
    const totalNvrHddMaxCapacity = this.designToolService.advancedNvrList
      .filter(nvr => nvr.hddMaxCapacity)
      .map(nvr => nvr.qty * this.getHddMaxCapacity(nvr.hddMaxCapacity) * this.gethddDevices(nvr.hddDevices))
      .reduce((total, num) => total + num, 0);

    this.remainingCh = totalQty - totalNvrChannel;
    this.remainingMbps = totalBandwidth - totalNvrRecordingThroughput;
    this.remainingTb = totalStorage - totalNvrHddMaxCapacity;

    this.changeIsAdvancedNvrDone();
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

  isAdvancedNvrChanged() {
    this.changeRemaining();
  }

  changeIsAdvancedNvrDone() {
    this.designToolService.isAdvancedNvrDone = true;
    if (this.designToolService.isAdvancedNvr) {
      this.designToolService.isAdvancedNvrDone =
        this.remainingCh <= 0 &&
        this.remainingMbps <= 0 &&
        this.remainingTb <= 0;
    }
  }
}
