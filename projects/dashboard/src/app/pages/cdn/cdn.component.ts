import { Component, OnDestroy, OnInit } from '@angular/core';
import { VvtkService } from '../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-cdn',
  templateUrl: './cdn.component.html',
  styleUrls: ['./cdn.component.scss']
})
export class CdnComponent implements OnInit, OnDestroy {
  fileTypes: string;
  enabled: boolean;
  isLoading = false;

  constructor(private vvtkService: VvtkService) {}

  ngOnInit() {
    this.setFileTypes();
  }

  ngOnDestroy() {}

  setFileTypes() {
    this.isLoading = true;
    this.vvtkService.get(
      {
        path: `api/CdnSetting`,
        disableLanguage: true
      },
      {
        next: resp => {
          const data = resp.json();
          this.fileTypes = data.fileTypes;
          this.enabled = data.enabled;
          this.isLoading = false;
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    const data = {
      fileTypes: this.fileTypes,
      enabled: this.enabled
    };
    this.vvtkService.post(
      {
        path: `api/CdnSetting`,
        disableLanguage: true
      },
      data,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }
}
