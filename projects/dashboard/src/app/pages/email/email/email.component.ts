import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EmailTemplate } from '../../../vvtk-core/classes/emailTemplate';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  @ViewChild('editor') editor: any;

  @Input() title: string;
  @Input() parameter: { key: string; value: string; preview: string }[];
  /**對應到資料庫內EmailTemplate的Name */
  @Input() name: string;

  selectedTab: number;
  template: EmailTemplate;
  email: EmailTemplate;
  mergeHtml: string;

  isLoading = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService
  ) {
    this.selectedTab = 0;
    this.template = {
      title: '',
      content: ''
    };
    this.email = {
      title: '',
      content: ''
    };
    this.mergeHtml = '';
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        if (this.name !== 'template') {
          this.getTemplate();
        }
        this.getHtml();
      }
    );
  }

  getTemplate() {
    this.vvtkService.get(
      {
        path: `api/EmailTemplates/template`
      },
      {
        next: resp => {
          const body = resp.json();
          this.setTemplate(body);
        }
      }
    );
  }

  setTemplate(template: EmailTemplate) {
    this.template.title = template.title || '';
    this.template.content = template.content || '';
    this.merge();
  }

  getHtml() {
    this.vvtkService.get(
      {
        path: `api/EmailTemplates/${this.name}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.setHtml(body);
        }
      }
    );
  }

  setHtml(email: EmailTemplate) {
    this.email.title = email.title || '';
    this.email.content = email.content || '';
    this.editor.setHtml(this.email.content);
    this.merge();
  }

  saveHtml() {
    this.isLoading = true;

    this.updateEditorHtml();
    this.vvtkService.patch(
      {
        path: `api/EmailTemplates/${this.name}`
      },
      this.email,
      {
        next: resp => {
          this.getHtml();
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  merge() {
    if (this.name !== 'template') {
      this.mergeHtml = this.template.content.replace(
        /template\-content/,
        this.email.content
      );
    } else {
      this.mergeHtml = this.email.content;
    }
    this.parameter.forEach((item, idx) => {
      const reg = new RegExp(`template-${item.key}`, 'g');
      this.mergeHtml = this.mergeHtml.replace(reg, item.preview);
    });
  }

  getMergeHtml() {
    this.merge();
    return this.mergeHtml;
  }

  updateEditorHtml() {
    this.email.content = this.editor.getHtml();
    this.merge();
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
