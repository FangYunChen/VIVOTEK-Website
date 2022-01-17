import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type25',
  templateUrl: './templates-type25.component.html',
  styleUrls: ['./templates-type25.component.scss']
})
export class TemplatesType25Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output() upload = new EventEmitter<boolean>();

  groupOptionsBanner: SortablejsOptions = {
    group: 'groupCard',
    handle: '.drag-handle-card',
    animation: 300
  };

  constructor(
    private vvtkApiService: VvtkApiService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() { }

  uploadFile($event, idx: number, imageDevice: string) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.bannerImages[idx][imageDevice].title = file.name;
    this.template.bannerImages[idx][imageDevice].alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.bannerImages[idx][imageDevice].src = x.link
      );
  }

  addImage(idx: number) {
    // this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.bannerImages);
    clone.splice(idx, 0, {
      imagePC: {
        src: '',
        alt: '',
        title: ''
      },
      imageTablet: {
        src: '',
        alt: '',
        title: ''
      },
      imageMobile: {
        src: '',
        alt: '',
        title: ''
      }
    });
    this.template.bannerImages = clone;
  }

  deleteBanner(idx: number) {
    this.template.bannerImages.splice(idx, 1);
  }

}
