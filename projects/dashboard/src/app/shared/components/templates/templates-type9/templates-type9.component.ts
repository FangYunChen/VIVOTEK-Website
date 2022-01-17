import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type9',
  templateUrl: './templates-type9.component.html',
  styleUrls: ['./templates-type9.component.scss']
})
export class TemplatesType9Component implements OnInit {

  @Input() readOnly;
  @Input() isLoading;
  @Input() path;
  @Input() templateIndex;
  @Input() template: Template;

  @Output() upload = new EventEmitter<boolean>();

  groupOptionsIcon: SortablejsOptions = {
    group: 'groupIcon',
    handle: '.drag-handle-icon',
    animation: 300
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addIcon(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.icons);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      htmlContent: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      url: '',
      urlEnabled: true
    });
    this.template.icons = clone;
  }

  deleteIcon(idx: number) {
    this.template.icons.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.icons[j].image.title = file.name;
    this.template.icons[j].image.alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.icons[j].image.src = x.link
      );
  }

}
