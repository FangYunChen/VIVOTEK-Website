import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type14',
  templateUrl: './templates-type14.component.html',
  styleUrls: ['./templates-type14.component.scss']
})
export class TemplatesType14Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output()
  upload = new EventEmitter<boolean>();

  groupOptionsImage: SortablejsOptions = {
    group: 'groupImage',
    handle: '.drag-handle-image',
    animation: 300
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addImage(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.images);
    clone.splice(idx, 0, {
      hideContent: false,
      src: '',
      alt: '',
      title: '',
      url: ''
    });
    this.template.images = clone;
  }

  deleteImage(idx: number) {
    this.template.images.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.images[j].title = file.name;
    this.template.images[j].alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.images[j].src = x.link
      );
  }

}
