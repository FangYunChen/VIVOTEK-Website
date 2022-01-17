import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type17',
  templateUrl: './templates-type17.component.html',
  styleUrls: ['./templates-type17.component.scss']
})
export class TemplatesType17Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output() upload = new EventEmitter<boolean>();

  constructor(
    private vvtkApiService: VvtkApiService,
  ) { }

  ngOnInit() { }

  uploadFile($event, imageDevice: string) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.bannerImage[imageDevice].title = file.name;
    this.template.bannerImage[imageDevice].alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.bannerImage[imageDevice].src = x.link
      );
  }

}
