import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { CommonSelectOption } from '../../../../vvtk-core/interface/common-model';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type16',
  templateUrl: './templates-type16.component.html',
  styleUrls: ['./templates-type16.component.scss']
})
export class TemplatesType16Component implements OnInit {

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

  columns: CommonSelectOption[] = [
    { value: 1, optionText: '1 Column' },
    { value: 2, optionText: '2 Columns' },
    { value: 3, optionText: '3 Columns' },
    { value: 4, optionText: '4 Columns' },
    { value: 5, optionText: '5 Columns' },
    { value: 6, optionText: '6 Columns' }
  ];

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    // default value
    if (!this.template.rowColumn) {
      this.template.rowColumn = 6;
    }
  }

  addImage(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.linkImages);
    clone.splice(idx, 0, {
      hideContent: false,
      src: '',
      alt: '',
      title: '',
      linkText: '',
      description: '',
      url: ''
    });
    this.template.linkImages = clone;
  }

  deleteImage(idx: number) {
    this.template.linkImages.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.linkImages[j].title = file.name;
    this.template.linkImages[j].alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.linkImages[j].src = x.link
      );
  }

}
