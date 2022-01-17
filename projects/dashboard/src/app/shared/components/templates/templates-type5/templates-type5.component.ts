import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type5',
  templateUrl: './templates-type5.component.html',
  styleUrls: ['./templates-type5.component.scss']
})
export class TemplatesType5Component implements OnInit {

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

  uploadFile($event) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.image.title = file.name;
    this.template.image.alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.image.src = x.link
      );
  }

}
