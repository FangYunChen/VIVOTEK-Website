import { Component, OnInit } from '@angular/core';
import { DesignToolProductService } from '../../design-tool-product.service';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductInfo } from '../../interface/design-tool-product-info';

@Component({
  selector: 'vvtk-storage-and-bandwidth',
  templateUrl: './storage-and-bandwidth.component.html',
  styleUrls: ['./storage-and-bandwidth.component.scss']
})
export class StorageAndBandwidthComponent implements OnInit {
  get productList() {
    return this.designToolProductService.productList;
  }

  constructor(
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {}

  getTotalLiveviewBandwidth(): number {
    return this.productList
      .map(product => +product.liveviewBandwidth * +product.qty)
      .reduce((total, num) => total + num, 0);
  }

  getTotalContinuousRecordingBandwidth(): number {
    return this.productList
      .map(product => +product.continuousRecordingBandwidth * +product.qty)
      .reduce((total, num) => total + num, 0);
  }

  getTotalEventRecordingBandwidth(): number {
    return this.productList
      .map(product => +product.eventRecordingBandwidth * +product.qty)
      .reduce((total, num) => total + num, 0);
  }

  getTotalHybridRecordingBandwidth(): number {
    return this.productList
      .map(product => +product.hybridRecordingBandwidth * +product.qty)
      .reduce((total, num) => total + num, 0);
  }

  getTotalBandwidth(): number {
    return (
      this.getTotalLiveviewBandwidth() +
      this.getTotalContinuousRecordingBandwidth() +
      this.getTotalEventRecordingBandwidth() +
      this.getTotalHybridRecordingBandwidth()
    );
  }
}
