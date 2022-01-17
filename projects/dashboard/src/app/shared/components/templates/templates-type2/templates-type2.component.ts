import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type2',
  templateUrl: './templates-type2.component.html',
  styleUrls: ['./templates-type2.component.scss']
})
export class TemplatesType2Component implements OnInit {

  @Input() readOnly;
  @Input() isLoading;
  @Input() path;
  @Input() templateIndex;
  @Input() template: Template;

  @Output() upload = new EventEmitter<boolean>();

  groupOptionsDownload: SortablejsOptions = {
    group: 'groupDownload',
    handle: '.drag-handle-download',
    animation: 300
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addDownload(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.downloadList);
    clone.splice(idx, 0, {
      hideContent: false,
      description: '',
      url: ''
    });
    this.template.downloadList = clone;
  }

  deleteDownload(idx: number) {
    this.template.downloadList.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.downloadList[j].url = '';
    this.template.downloadList[j].description = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.downloadList[j].url = x.link
      );
  }

}
