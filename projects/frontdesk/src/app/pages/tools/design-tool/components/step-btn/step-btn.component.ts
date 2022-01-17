import { Component, OnInit, Input } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolProductService } from '../../design-tool-product.service';

@Component({
  selector: 'vvtk-step-btn',
  templateUrl: './step-btn.component.html',
  styleUrls: ['./step-btn.component.scss']
})
export class StepBtnComponent implements OnInit {
  @Input() hasExport: boolean;
  @Input() hasNext: boolean;
  @Input() canNext: boolean;
  @Input() hasBack: boolean;

  constructor(
    private designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {}

  exportPDF() {
    const products = this.designToolProductService.productList;
    const data = {
      ProjectName: this.designToolService.projectName,
      Products: products.map(product => {
        return {
          ModelName: product.modelName,
          Qty: product.qty,
          Q: product.q,
          Scenario: product.scenario.replace('_', ' '),
          ContinuousRecordingBandwidth:
            +product.qty * +product.continuousRecordingBandwidth,
          EventRecordingBandwidth:
            +product.qty * +product.eventRecordingBandwidth,
          HybridRecordingBandwidth:
            +product.qty * +product.hybridRecordingBandwidth,
          LiveviewBandwidth: +product.qty * +product.liveviewBandwidth,
          Storage: +product.qty * +product.storage,
          Streaming: this.designToolProductService.getStreaming(
            product.isRecording,
            product.isLiveview
          ),
          recordingStreamType: product.recordingStreamType,
          continuousRecordingCodecInfo: product.continuousRecordingCodecInfo,
          eventRecordingCodecInfo:product.eventRecordingCodecInfo,
          hybridRecordingCodecInfo:product.hybridRecordingCodecInfo,
          liveviewCodecInfo:product.liveviewCodecInfo
        };
      }),
      VmsSelector: this.designToolService.vmsSelector,
      VmsValue: this.designToolService.vmsValue,
      CpuName: this.designToolService.cpuName,
      ServerCount: this.designToolService.serverCount,
      IsExportVms: this.designToolService.isExportVms,
      IsBasicNvr: this.designToolService.isBasicNvr,
      BasicNvr: [this.designToolService.basicNvr]
        .map(nvr => {
          return {
            Name: nvr.model,
            HddDevices: nvr.hddDevices,
            HddMaxCapacity: nvr.hddMaxCapacity,
            MaximumChanel: nvr.maximumChanel,
            RecordingThroughput: nvr.recordingThroughput,
            NetworkThroughput: nvr.networkThroughput,
            Qty: nvr.qty
          };
        })
        .pop(),
      IsAdvancedNvr: this.designToolService.isAdvancedNvr,
      AdvancedNvrList: this.designToolService.advancedNvrList.map(nvr => {
        return {
          Name: nvr.model,
          HddDevices: nvr.hddDevices,
          HddMaxCapacity: nvr.hddMaxCapacity,
          MaximumChanel: nvr.maximumChanel,
          RecordingThroughput: nvr.recordingThroughput,
          NetworkThroughput: nvr.networkThroughput,
          Qty: nvr.qty
        };
      })
    };
    this.designToolService.downloadPDF(data);
  }
}
