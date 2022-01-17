import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/internal/operators';
import { environment } from '../../../../environments/environment';
import { AuthHttpService } from '../../../vvtk-core/services/auth.service';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-maintain-modules',
  templateUrl: './maintain-modules.component.html'
})
export class MaintainModulesComponent implements OnInit {
  pageIsEditable: boolean;

  constructor(
    private authHttp: AuthHttpService,
    private toolsService: ToolsService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
  }

  download() {
    document.location.href = `${environment.apiUrl}/api/System/Modules/Export`;
  }

  fileSelect($event) {
    if (($event.target.files as FileList).length !== 1) {
      return;
    }

    this.toolsService.showSnackBar('Uploading...');
    const file: File = $event.target.files[0] as File;
    const form = new FormData();
    form.append('file', file, file.name);
    this.authHttp
      .post('/api/System/Modules/Import', form)
      .pipe(
        finalize(() => {
          $event.target.value = null; // 清空以便使用 onchange 監聽第二次的上傳
        })
      )
      .subscribe(
        resp => {
          this.toolsService.showSnackBar('Done!');
        },
        error => {
          this.toolsService.apiError(error);
        }
      );
  }
}
