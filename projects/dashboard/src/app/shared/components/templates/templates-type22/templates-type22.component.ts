import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type22',
  templateUrl: './templates-type22.component.html',
  styleUrls: ['./templates-type22.component.scss']
})
export class TemplatesType22Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output()
  upload = new EventEmitter<boolean>();

  groupOptionsCard: SortablejsOptions = {
    group: 'groupCard',
    handle: '.drag-handle-card',
    animation: 300
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  addPanel(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.panels);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      subtitle: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      htmlContent: ''
    });
    this.template.panels = clone;
  }

  deletePanel(idx: number) {
    this.template.panels.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.panels[j].image.title = file.name;
    this.template.panels[j].image.alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.panels[j].image.src = x.link
      );
  }

}
