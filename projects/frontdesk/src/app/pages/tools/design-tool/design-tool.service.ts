import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DesignToolTypeInfo } from './interface/design-tool-type-info';
import { DesignToolModelSettingInfo } from './interface/design-tool-model-setting-info';
import { DesignToolBandWidthInfo } from './interface/design-tool-band-width-info';
import { Observable } from 'rxjs';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';
import { saveAs } from 'file-saver/FileSaver';
import { DesignToolCpuBenchmarkInfo } from './interface/design-tool-cpu-benchmark-info';
import { DesignToolCameraCalculationInfo } from './interface/design-tool-camera-calculation-info';
import { DesignToolNvrInfo } from './interface/design-tool-nvr-info';
import { DesignToolAdvancedNvrInfo } from './interface/design-tool-advanced-nvr-info';

@Injectable({
  providedIn: 'root'
})
export class DesignToolService {
  vmsSelector = 1;
  vmsValue?: number;
  projectName: string;
  isDownloading = false;
  isExportVms = false;
  isBasicNvr = false;
  isAdvancedNvr = false;
  isAdvancedNvrDone = true;
  basicNvr: DesignToolAdvancedNvrInfo = {};
  advancedNvrList: Array<DesignToolAdvancedNvrInfo> = [
    {
      qty: 1
    }
  ];
  cpuName: string;
  serverCount: number;

  constructor(
    private http: HttpClient,
    private vvtkApiService: VvtkApiService
  ) {}

  getTypeList(): Observable<DesignToolTypeInfo[]> {
    return this.http.get<Array<DesignToolTypeInfo>>(
      './assets/design-tool/IPCam_video_setting_type.json'
    );
  }

  getModelSettingList(): Observable<DesignToolModelSettingInfo[]> {
    return this.http.get<Array<DesignToolModelSettingInfo>>(
      './assets/design-tool/IPCam_video_setting.json'
    );
  }

  getBandWidthList(filename: string): Observable<DesignToolBandWidthInfo[]> {
    return this.http.get<Array<DesignToolBandWidthInfo>>(
      `./assets/design-tool/BandWidth_${filename}.json`
    );
  }

  getCpuBenchmarkList(): Observable<DesignToolCpuBenchmarkInfo[]> {
    return this.http.get<Array<DesignToolCpuBenchmarkInfo>>(
      './assets/design-tool/CPU_Benchmark_List.json'
    );
  }

  getCpuBenchmarkList2(){
    return this.http.get<any[]>(
      './assets/design-tool/CPU_Benchmark_List.json'
    );
  }

  getCameraCalculationList(): Observable<DesignToolCameraCalculationInfo[]> {
    return this.http.get<Array<DesignToolCameraCalculationInfo>>(
      './assets/design-tool/Camera_Calculation_Table.json'
    );
  }

  getNvrList(): Observable<DesignToolNvrInfo[]> {
    return this.http.get<Array<DesignToolNvrInfo>>(
      './assets/design-tool/NVR.json'
    );
  }

  downloadPDF(data) {
    this.isDownloading = true;
    this.vvtkApiService
      .downloadFileByPost(
        {
          path: `api/ExportPDF/designtool`
        },
        data
      )
      .pipe(finalize(() => (this.isDownloading = false)))
      .subscribe(blob => {
        const pdf = new Blob([blob], {
          type: 'application/pdf'
        });
        saveAs(pdf, 'designtool.pdf');
      });
  }
}
