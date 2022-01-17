import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { Image } from '../../../../vvtk-core/interface/image';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type28',
  templateUrl: './templates-type28.component.html',
  styleUrls: ['./templates-type28.component.scss']
})
export class TemplatesType28Component implements OnInit {

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

  imageSelectorVisible: boolean[] = [];

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    if (!this.template.imagePosition) {
      this.template.imagePosition = 'bottom';
    }
    this.imageSelectorVisible = this.template.linkImages.map(x => false);
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

  displayImageSelector(imageIndex: number) {
    this.imageSelectorVisible[imageIndex] = true;
  }

  setImage(image: Image, imageIndex: number) {
    this.template.linkImages[imageIndex].src = image.imagePath;
    this.template.linkImages[imageIndex].alt = image.name;
    this.template.linkImages[imageIndex].title = image.name;
  }

}
