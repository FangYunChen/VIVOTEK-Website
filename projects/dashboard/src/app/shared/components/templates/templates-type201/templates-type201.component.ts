import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { Image } from '../../../../vvtk-core/interface/image';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type201',
  templateUrl: './templates-type201.component.html',
  styleUrls: ['./templates-type201.component.scss']
})
export class TemplatesType201Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output()
  upload = new EventEmitter<boolean>();

  groupOptions: SortablejsOptions = {
    group: 'group',
    handle: '.drag-handle',
    animation: 300
  };

  imageSelectorVisible: boolean[] = [];

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.imageSelectorVisible = this.template.imageTexts.map(x => false);
  }

  addSpecialHightlight(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.imageTexts);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      image: {
        src: '',
        alt: '',
        title: '',
        url: ''
      },
    });
    this.template.imageTexts = clone;
  }

  deleteSpecialHightlight(idx: number) {
    this.template.imageTexts.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.imageTexts[j].image.title = file.name;
    this.template.imageTexts[j].image.alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.imageTexts[j].image.src = x.link
      );
  }

  displayImageSelector(imageIndex: number) {
    this.imageSelectorVisible[imageIndex] = true;
  }

  setImage(image: Image, imageIndex: number) {
    this.template.imageTexts[imageIndex].image.src = image.imagePath;
    this.template.imageTexts[imageIndex].image.alt = image.name;
    this.template.imageTexts[imageIndex].image.title = image.name;
  }

}
