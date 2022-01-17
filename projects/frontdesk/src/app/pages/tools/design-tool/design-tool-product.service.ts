import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DesignToolProductInfo } from './interface/design-tool-product-info';
import { DesignToolModelSettingCodecInfo } from './interface/design-tool-model-setting-codec-info';
import { DesignToolBandWidthInfo } from './interface/design-tool-band-width-info';

@Injectable({
  providedIn: 'root'
})
export class DesignToolProductService {
  productList: Array<DesignToolProductInfo> = [this.initProduct()];
  product$ = new BehaviorSubject<number>(0);
  productModel$ = new Subject<string>();
  productRecordingCodecList$ = new Subject<DesignToolModelSettingCodecInfo[]>();
  productLiveviewCodecList$ = new Subject<DesignToolModelSettingCodecInfo[]>();
  bandWidthList$ = new Subject<DesignToolBandWidthInfo[]>();

  get totalRecordingBandwidth() {
    return this.productList
      .map(product => +product.recordingBandwidth * +product.qty)
      .reduce((total, num) => total + num, 0);
  }

  get totalStorage() {
    return this.productList
      .map(product => +product.storage * +product.qty)
      .reduce((total, num) => total + num, 0);
  }

  constructor() {}

  initProduct(): DesignToolProductInfo {
    const initProduct = new DesignToolProductInfo();
    initProduct.continuousRecordingCodecInfo = {};
    initProduct.eventRecordingCodecInfo = {};
    initProduct.hybridRecordingCodecInfo = {};
    initProduct.liveviewCodecInfo = {};
    return initProduct;
  }

  productAdded(index: number): void {
    this.productList = this.productList.reduce((init, product, _index) => {
      init.push(product);
      if (_index === index) {
        init.push(this.initProduct());
      }
      return init;
    }, []);
    this.product$.next(index + 1);
  }

  productChanged(index: number): void {
    this.product$.next(index);
  }

  productDeleted(index: number): void {
    this.productList = this.productList.filter(
      (product, _index) => _index !== index
    );
    this.product$.next(0);
  }

  filterProductHasValue() {
    return this.productList.filter(item => {
      if (!item.qty) {
        return;
      }

      if (item.isRecording && item.isLiveview) {
        return (
          item.recordingBandwidth && item.storage && item.liveviewBandwidth
        );
      }
      if (item.isRecording) {
        return item.recordingBandwidth && item.storage;
      }
      if (item.isLiveview) {
        return item.liveviewBandwidth;
      }
    });
  }

  productModelChanged(modelName: string) {
    this.productModel$.next(modelName);
  }

  getStreaming(isRecording: boolean, isLiveview: boolean) {
    return `${isRecording ? 'Recording' : ''}${
      isRecording && isLiveview ? ', ' : ''
    }${isLiveview ? 'Liveview' : ''}`;
  }
}
