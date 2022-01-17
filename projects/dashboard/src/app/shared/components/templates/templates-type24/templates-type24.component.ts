import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Template } from '../../../../vvtk-core/classes/template';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-templates-type24',
  templateUrl: './templates-type24.component.html',
  styleUrls: ['./templates-type24.component.scss']
})
export class TemplatesType24Component implements OnInit {

  @Input() readOnly;
  @Input() path;
  @Input() isLoading;
  @Input() templateIndex;
  @Input() template: Template;

  @Output() upload = new EventEmitter<boolean>();

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

  addCard(idx: number) {
    this.toolsService.lockScrollTop();
    const clone = this.toolsService.copyObject(this.template.cards);
    clone.splice(idx, 0, {
      hideContent: false,
      title: '',
      subtitle: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      url: '',
      htmlContent: ''
    });
    this.template.cards = clone;
  }

  deleteCard(idx: number) {
    this.template.cards.splice(idx, 1);
  }

  uploadFile($event, j: number) {
    this.upload.emit(true);
    const file: File = $event.target.files[0];
    this.template.cards[j].image.title = file.name;
    this.template.cards[j].image.alt = file.name;

    this.vvtkApiService.uploadFile(file, `${this.path}/${file.name}`)
      .pipe(
        finalize(() => {
          this.upload.emit(false);
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.template.cards[j].image.src = x.link
      );
  }

}
