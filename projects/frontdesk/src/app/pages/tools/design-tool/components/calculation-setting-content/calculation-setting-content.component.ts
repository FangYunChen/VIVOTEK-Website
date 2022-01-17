import { Component, OnInit } from '@angular/core';
import { DesignToolProductInfo } from '../../interface/design-tool-product-info';
import { DesignToolModelSettingInfo } from '../../interface/design-tool-model-setting-info';
import { DesignToolRecordingType } from '../../design-tool-recording-type';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-calculation-setting-content',
  templateUrl: './calculation-setting-content.component.html',
  styleUrls: ['./calculation-setting-content.component.scss']
})
export class CalculationSettingContentComponent implements OnInit {
  product: DesignToolProductInfo;
  modelSettingList: Array<DesignToolModelSettingInfo>;

  constructor(
    private designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {
    this.designToolService.getModelSettingList().subscribe(data => {
      this.modelSettingList = data;
    });

    this.designToolProductService.product$.subscribe(index => {
      this.product = this.designToolProductService.productList[index];
      this.ChangeModelSetting(this.product.modelName);
    });

    this.designToolProductService.productModel$.subscribe(modelName => {
      this.ChangeModelSetting(modelName);
      this.clearSetting();
    });
  }

  private ChangeModelSetting(modelName: string) {
    this.designToolProductService.productRecordingCodecList$.next(null);
    this.designToolProductService.productLiveviewCodecList$.next(null);
    if (modelName) {
      const _modelSetting = this.modelSettingList
      .filter(modelSetting => modelSetting.ModelName === modelName)
      .pop();
      if (_modelSetting) {
        this.designToolProductService.productRecordingCodecList$.next(_modelSetting.RecordingCodecList);
        this.designToolProductService.productLiveviewCodecList$.next(_modelSetting.LiveviewCodecList);
      }
    }
  }

  clearSetting(): void {
    this.product.continuousRecordingCodecInfo = {};
    this.product.eventRecordingCodecInfo = {};
    this.product.hybridRecordingCodecInfo = {};
    this.product.liveviewCodecInfo = {};
  }

  storageSizeChanged() {
    this.product.continuousRecordingBandwidth = 0;
    this.product.eventRecordingBandwidth = 0;
    this.product.hybridRecordingBandwidth = 0;
    this.product.liveviewBandwidth = 0;
    this.product.storage = 0;

    if (this.product.isRecording) {
      switch (+this.product.recordingStreamType) {
        case DesignToolRecordingType.Continuous:
          this.product.continuousRecordingBandwidth = this.product.continuousRecordingCodecInfo.bitRate;
          this.product.storage = this.product.continuousRecordingCodecInfo.storageSize;
          break;
        case DesignToolRecordingType.Event:
          this.product.eventRecordingBandwidth = this.product.eventRecordingCodecInfo.bitRate;
          this.product.storage = this.product.eventRecordingCodecInfo.storageSize;
          break;
        case DesignToolRecordingType.Hybrid:
          this.product.hybridRecordingBandwidth = this.product.hybridRecordingCodecInfo.bitRate;
          this.product.storage = this.product.hybridRecordingCodecInfo.storageSize;
          break;
      }
    }
    if (this.product.isLiveview) {
      this.product.liveviewBandwidth = this.product.liveviewCodecInfo.bitRate;
    }
  }
}
