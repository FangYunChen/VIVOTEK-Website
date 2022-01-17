import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DesignToolModelSettingCodecInfo } from '../../interface/design-tool-model-setting-codec-info';
import { DesignToolRecordingCodecInfo } from '../../interface/design-tool-recording-codec-info';
import { DesignToolRecordingType } from '../../design-tool-recording-type';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-recording-streaming-item',
  templateUrl: './recording-streaming-item.component.html',
  styleUrls: ['./recording-streaming-item.component.scss']
})
export class RecordingStreamingItemComponent implements OnInit {
  @Input() recordingType: DesignToolRecordingType;
  @Input() codecInfo: DesignToolRecordingCodecInfo;
  @Input() qty: number;
  @Input() disable: boolean;
  @Input() isSelected: boolean;
  @Output() storageSizeChanged = new EventEmitter();

  recordingCodecList: Array<DesignToolModelSettingCodecInfo>;
  hourList: Array<number> = [];
  percentageList: Array<number> = [];

  get isRecordingHours() {
    if (this.hourList) {
      return this.hourList.length === 0;
    }
  }

  get isEventPercentage() {
    if (this.percentageList) {
      return this.percentageList.length === 0;
    }
  }

  constructor(private designToolProductService: DesignToolProductService) {}

  ngOnInit() {
    this.initView();
    this.designToolProductService.productRecordingCodecList$.subscribe(
      recordingCodecList => {
        this.recordingCodecList = recordingCodecList;
      }
    );
  }

  initView() {
    switch (this.recordingType) {
      case DesignToolRecordingType.Continuous:
        this.hourList = Array.from(Array(24).keys()).map(i => i + 1);
        break;
      case DesignToolRecordingType.Event:
        this.percentageList = Array.from(Array(10).keys()).map(
          i => (i + 1) * 10
        );
        break;
      case DesignToolRecordingType.Hybrid:
        this.hourList = Array.from(Array(23).keys()).map(i => i + 1);
        this.percentageList = Array.from(Array(10).keys()).map(
          i => (i + 1) * 10
        );
        break;
    }
  }

  bitRateChanged() {
    this.changeStorageSize();
  }

  changeStorageSize() {
    this.codecInfo.storageSize = 0;
    if (!this.codecInfo.bitRate || isNaN(+this.codecInfo.recordingDays)) {
      return;
    }

    if (
      !this.codecInfo.recordingHours &&
      this.recordingType !== DesignToolRecordingType.Event
    ) {
      return;
    }

    if (
      !this.codecInfo.eventPercentage &&
      this.recordingType !== DesignToolRecordingType.Continuous
    ) {
      return;
    }

    this.codecInfo.storageSize = this.getStorageSize();
    this.storageSizeChanged.emit();
  }

  getStorageSize() {
    switch (this.recordingType) {
      case DesignToolRecordingType.Continuous:
        return (
          ((this.codecInfo.bitRate * 3600) / 8) *
          +this.codecInfo.recordingHours *
          +this.codecInfo.recordingDays
        );
      case DesignToolRecordingType.Event:
        return (
          ((((this.codecInfo.bitRate * 3600) / 8) *
            +this.codecInfo.eventPercentage) /
            100) *
          +this.codecInfo.recordingDays *
          24
        );
      case DesignToolRecordingType.Hybrid:
        return (
          ((this.codecInfo.bitRate * 3600) / 8) *
          +this.codecInfo.recordingDays *
          (+this.codecInfo.recordingHours +
            ((24 - +this.codecInfo.recordingHours) *
              +this.codecInfo.eventPercentage) /
              100)
        );
    }
  }
}
