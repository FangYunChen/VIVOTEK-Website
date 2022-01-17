import { Component, OnInit, ViewChild } from '@angular/core';
import { DesignToolService } from '../../design-tool.service';
import { DesignToolCpuBenchmarkInfo } from '../../interface/design-tool-cpu-benchmark-info';
import { DesignToolCameraCalculationInfo } from '../../interface/design-tool-camera-calculation-info';
import { DesignToolProductService } from '../../design-tool-product.service';
import { DesignToolRecordingType } from '../../design-tool-recording-type';
import { DesignToolRecordingCodecInfo } from '../../interface/design-tool-recording-codec-info';
import { DesignToolProductInfo } from '../../interface/design-tool-product-info';
import { FormControl, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'vvtk-pc-client',
  templateUrl: './pc-client.component.html',
  styleUrls: ['./pc-client.component.scss']
})
export class PcClientComponent implements OnInit {
  cpuBenchmarkList2: Array<DesignToolCpuBenchmarkInfo>;
  cpuBenchmarkList: DesignToolCpuBenchmarkInfo[] = [];
  cameraCalculationList: Array<DesignToolCameraCalculationInfo>;
  myControl = new FormControl();
  filteredOptions: Observable<Array<DesignToolCpuBenchmarkInfo>>;

  get percent(): number {
    if (!this.designToolService.cpuName) {
      return;
    }
    const originalTotalCpuLoading = this.designToolProductService.productList
      .map(product => {
        const codecInfo = this.getCodecInfo(product);
        return +product.qty * this.getCalculation(codecInfo);
      })
      .reduce((total, num) => total + num, 0);

    if(this.cpuBenchmarkList2
      .filter(cpu => cpu.Name === this.designToolService.cpuName).length === 0){
        return;
      }

    const cpuBenchmark = this.cpuBenchmarkList2
      .filter(cpu => cpu.Name === this.designToolService.cpuName)
      .pop().Value;

    return +((originalTotalCpuLoading * 9778) / cpuBenchmark).toFixed(1);
  }

  get percentOne(): number {
    return Math.ceil(+(this.percent / this.serverCount) * 10) / 10; // 無條件進位到小數點第一位
  }

  get serverCount(): number {
    this.designToolService.serverCount = Math.ceil(this.percent / 80);
    return this.designToolService.serverCount;
  }

  constructor(
    public designToolService: DesignToolService,
    private designToolProductService: DesignToolProductService
  ) {}

  ngOnInit() {
    this.designToolService.getCpuBenchmarkList().subscribe(data => {
      this.cpuBenchmarkList = data;
      this.cpuBenchmarkList2 = data;
    });
    this.designToolService.getCameraCalculationList().subscribe(data => {
      this.cameraCalculationList = data;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): Array<DesignToolCpuBenchmarkInfo> {
    const filterValue = value.toLowerCase();

    return this.cpuBenchmarkList.filter(option => option.Name.toLowerCase().includes(filterValue));
  }

  getCodecInfo(product: DesignToolProductInfo): DesignToolRecordingCodecInfo {
    if (product.isLiveview) {
      return product.liveviewCodecInfo;
    }
  }

  getCalculation(codec: DesignToolRecordingCodecInfo): number {
    if (!codec) {
      return 0;
    }
    return (+codec.fps * (+this.getCpuLoadingPerFrame(codec) * 1000)) / 1000;
  }

  getCpuLoadingPerFrame(codec: DesignToolRecordingCodecInfo): number {
    const _cameraCalculation = this.cameraCalculationList
      .filter(
        cameraCalculation => cameraCalculation.Resolution === codec.resolution
      )
      .pop();

    if (!_cameraCalculation) {
      return 0;
    }
    if (codec.codec === 'H.264' && codec.smartStream === 'SS0') {
      return +_cameraCalculation.H264Normal;
    }
    if (codec.codec === 'H.264' && codec.smartStream !== 'SS0') {
      return +_cameraCalculation.H264SmartStream;
    }
    if (codec.codec === 'H.265' && codec.smartStream === 'SS0') {
      return +_cameraCalculation.H265Normal;
    }
    if (codec.codec === 'H.265' && codec.smartStream !== 'SS0') {
      return +_cameraCalculation.H265SmartStream;
    }
    if (codec.codec === 'MJPEG') {
      return +_cameraCalculation.Jpeg;
    }
  }

  isPercentOneAboveThen80(): boolean {
    return this.percentOne >= 80;
  }
}
