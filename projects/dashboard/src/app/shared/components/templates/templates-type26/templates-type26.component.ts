import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type26',
  templateUrl: './templates-type26.component.html',
  styleUrls: ['./templates-type26.component.scss']
})
export class TemplatesType26Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output() upload = new EventEmitter<boolean>();

  groupOptionsBanner: SortablejsOptions = {
    group: 'groupBanner',
    handle: '.drag-handle-card',
    animation: 300
  };

  columns: Columns[] = [
    { name: 'left', key: 'model-leftImg' },
    { name: 'right', key: 'model-rightImg' }
  ];

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  uploadFile($event, idx: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.imageTexts[idx].image.title = file.name;
    this.template.imageTexts[idx].image.alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.imageTexts[idx].image.src = x.link
      );
  }

  addImage(idx: number) {
    const clone = this.toolsService.copyObject(this.template.imageTexts);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      htmlContent: '',
      url: '',
      horizontal: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      urlEnabled: false
    });
    this.template.imageTexts = clone;
  }

  deletePanel(idx: number) {
    this.template.imageTexts.splice(idx, 1);
  }

  selectChange(val: string, idx: number) {
    this.template.imageTexts[idx].horizontal = val;
  }
}

export interface Columns {
  name: string;
  key: string;
}
