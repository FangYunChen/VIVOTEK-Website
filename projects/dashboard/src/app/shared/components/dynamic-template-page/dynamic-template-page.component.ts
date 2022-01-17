import { Component, Input, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sheet } from '../../../vvtk-core/classes/table';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { TemplatesComponent } from '../templates/templates.component';
import { DynamicTemplatePageOption } from '../../../vvtk-core/classes/dynamicTemplate';
import { TabTemplates } from '../../../vvtk-core/classes/template';

@Component({
  selector: 'vvtk-dynamic-template-page',
  templateUrl: './dynamic-template-page.component.html',
  styleUrls: ['./dynamic-template-page.component.scss']
})
export class DynamicTemplatePageComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChild('editor') editor: any;
  @ViewChild('templates') templates: TemplatesComponent;

  @Input()
  opts: DynamicTemplatePageOption;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  @Input()
  data: TabTemplates;

  @Output()
  dataChange: EventEmitter<TabTemplates> = new EventEmitter<TabTemplates>();

  sheet: Sheet;

  isLoading = false;
  public tabname: string;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) { }

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
    if (this.opts.id !== 0) {
      this.vvtkService.get(
        {
          path: `${this.opts.apis.get}/${this.opts.id}`
        },
        {
          next: resp => {
            const body = resp.json();
            this.data = body || {
              templates: [],
              content: '',
              sheet: null
            };
            this.dataChange.emit(this.data);
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

    // id = 0 新增一筆
    // id != 0 修改資料
    if (this.opts.id === 0) {
      this.vvtkService.post(
        {
          path: this.opts.apis.post,
          disableLanguage: true
        },
        this.data,
        {
          finally: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.vvtkService.patch(
        {
          path: `${this.opts.apis.patch}/${this.opts.id}`
        },
        this.data,
        {
          finally: () => {
            this.isLoading = false;
          }
        });
    }
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
