import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DesignToolModelSettingCodecInfo } from '../../interface/design-tool-model-setting-codec-info';
import { DesignToolCodecInfo } from '../../interface/design-tool-codec-info';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-liveview-streaming-item',
  templateUrl: './liveview-streaming-item.component.html',
  styleUrls: ['./liveview-streaming-item.component.scss']
})
export class LiveviewStreamingItemComponent implements OnInit {
  @Input() codecInfo: DesignToolCodecInfo;
  @Input() qty: number;
  @Input() isSelected: boolean;
  @Output() bitRateChanged = new EventEmitter();

  liveviewCodecList: Array<DesignToolModelSettingCodecInfo>;

  constructor(private designToolProductService: DesignToolProductService) {}

  ngOnInit() {
    this.designToolProductService.productLiveviewCodecList$.subscribe(
      liveviewCodecList => {
        this.liveviewCodecList = liveviewCodecList;
      }
    );
  }

  changeBitRate() {
    this.bitRateChanged.emit();
  }
}
