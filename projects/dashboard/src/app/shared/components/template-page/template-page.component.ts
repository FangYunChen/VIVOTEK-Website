import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sheet } from '../../../vvtk-core/classes/table';
import { Templates, TemplatePageOption } from '../../../vvtk-core/classes/template';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { TemplatesComponent } from '../templates/templates.component';

@Component({
  selector: 'vvtk-template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChild('editor') editor: any;
  @ViewChild('templates') templates: TemplatesComponent;

  @Input()
  opts: TemplatePageOption;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  data: Templates;
  sheet: Sheet;

  isLoading = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.data = {
      templates: [],
      content: '',
      sheet: null
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.getData();
      }
    );
  }

  getData() {
    this.vvtkService.get(
      { path: this.opts.apis.get },
      {
        next: resp => {
          const body = resp.json();
          this.data = body || {
            templates: [],
            content: '',
            sheet: null
          };
          if (this.opts.hasTemplate) {
            this.data.templates = this.data.templates || [];
            this.templates.setData(this.data.templates);
          }
          if (this.opts.hasContent) {
            this.data.content = this.data.content || '';
            this.editor.setHtml(this.data.content);
          }
          if (this.opts.hasSheet && this.data.sheet) {
            this.sheet = JSON.parse(this.data.sheet);
          }
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    if (this.opts.hasTemplate) {
      this.data.templates = this.templates.getData();
    }
    if (this.opts.hasContent) {
      this.data.content = this.editor.getHtml();
    }
    if (this.opts.hasSheet && this.sheet) {
      this.data.sheet = JSON.stringify(this.sheet);
    }
    this.vvtkService.patch({ path: this.opts.apis.patch }, this.data, {
      finally: () => {
        this.isLoading = false;
      }
    });
  }

  updateEditorHtml() {
    this.data.content = this.editor.getHtml();
  }

  fileSelect($event) {
    const file: File = $event.target.files[0];
    this.isLoading = true;

    this.vvtkService.postFormData(
      {
        path: 'api/Execl2Json',
        disableLanguage: true
      },
      {
        file: file
      },
      {
        next: resp => {
          const body = resp.json();
          this.sheet = body.sheet;
        },
        finally: () => {
          this.isLoading = false;
          $event.target.value = null;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
