import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DesignToolModelSettingCodecInfo } from '../../interface/design-tool-model-setting-codec-info';
import { DesignToolCodecInfo } from '../../interface/design-tool-codec-info';
import { DesignToolBandWidthInfo } from '../../interface/design-tool-band-width-info';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductService } from '../../design-tool-product.service';
import { DesignToolProductInfo } from '../../interface/design-tool-product-info';

@Component({
  selector: 'vvtk-streaming-item',
  templateUrl: './streaming-item.component.html',
  styleUrls: ['./streaming-item.component.scss']
})
export class StreamingItemComponent implements OnInit {
  @Input() codecInfoList: Array<DesignToolModelSettingCodecInfo>;
  @Input() codecInfo: DesignToolCodecInfo;
  @Input() disable: boolean;
  @Input() isSelected: boolean;
  @Output() bitRateChanged = new EventEmitter();

  bandWidthList: Array<DesignToolBandWidthInfo>;
  product: DesignToolProductInfo;

  get canSmartStream() {
    if (
      this.codecInfo.smartStreamList &&
      this.codecInfo.smartStreamList.length > 1 &&
      this.codecInfo.codec !== 'MJPEG'
    ) {
      return true;
    }
  }

  get smartStreamOn() {
    if (this.canSmartStream) {
      return this.codecInfo.smartStreamList[1];
    }
  }

  get smartStreamOff() {
    if (this.codecInfo.smartStreamList) {
      return this.codecInfo.smartStreamList[0];
    }
  }

  constructor(private designToolService: DesignToolService,
              private designToolProductService: DesignToolProductService) {}

  ngOnInit() {
    this.designToolProductService.bandWidthList$.subscribe(data => {
        this.bandWidthList = data;
        this.changeBitRate();
      });

    this.designToolProductService.product$.subscribe(index => {
      this.product = this.designToolProductService.productList[index];
    });
  }

  codecChanged() {
    this.ChangeUIList(this.codecInfo.codec);
    this.changeBitRate();
  }

  private ChangeUIList(codec: string) {
    const _codecInfoList = this.codecInfoList
      .filter(codecInfo => codecInfo.CodecName === codec)
      .pop();
    this.codecInfo.resolutionList = _codecInfoList.ResolutionList;
    this.codecInfo.fpsList = [];
    this.codecInfo.qualityList = _codecInfoList.QualityList;
    this.codecInfo.smartStreamList = _codecInfoList.SmartStreamList;
    this.codecInfo.resolution = null;
    this.codecInfo.fps = null;
    this.codecInfo.quality = null;
    this.codecInfo.smartStream = null;
    if (this.codecInfo.codec === 'MJPEG') {
      this.codecInfo.smartStream = 'SS0';
    }
  }

  resolutionChanged() {
    this.codecInfo.fpsList = this.codecInfo.resolutionList
      .filter(
        resolution => resolution.ResolutionName === this.codecInfo.resolution
      )
      .pop().FpsList;
    this.codecInfo.fps = null;
    this.changeBitRate();
  }

  changeBitRate() {
    this.codecInfo.bitRate = 0;
    if (
      this.bandWidthList &&
      this.codecInfo &&
      this.codecInfo.codec &&
      this.codecInfo.resolution &&
      this.codecInfo.fps &&
      this.codecInfo.quality &&
      this.codecInfo.smartStream
    ) {
      const tmp = this.bandWidthList.filter(
        bandWidth =>
          bandWidth.Codec === this.codecInfo.codec &&
          bandWidth.Resolution === this.codecInfo.resolution &&
          bandWidth.Fps === this.codecInfo.fps &&
          bandWidth.Quality === this.codecInfo.quality &&
          bandWidth.SmartStream === this.codecInfo.smartStream
      );
      if (tmp.length >= 1) {
        this.codecInfo.bitRate = +tmp.pop().BandWidthValue;
      }
    }
    this.bitRateChanged.emit();
  }
}
