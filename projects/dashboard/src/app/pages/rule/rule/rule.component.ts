import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { Rule, RuleOpts } from '../../../vvtk-core/classes/rule';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChild('editorTop') editorTop: any;
  @ViewChildren('editor') editor: any;
  @Input() opts: RuleOpts;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  selectedLanguage$: Subscription;

  data: Rule = {
    content: '',
    list: []
  };

  isLoading = false;
  readOnly = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService
  ) {}

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getData();
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: this.opts.get
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body || {
            content: '',
            list: []
          };
          setTimeout(() => {
            this.editorTop.setHtml(this.data.content);
            this.data.list.forEach((content, idx) => {
              this.editor._results[idx].setHtml(content.content);
            });
          }, 10);
        }
      }
    );
  }

  save() {
    this.isLoading = true;

    this.data.content = this.editorTop.getHtml();
    this.data.list.forEach((content, idx) => {
      content.content = this.editor._results[idx].getHtml();
    });

    this.vvtkService.patch(
      {
        path: this.opts.patch
      },
      this.data,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  updateEditorHtml(i: number) {
    this.data.list[i].content = this.editor._results[i].getHtml();
  }

  updateEditorHtmlTop() {
    this.data.content = this.editorTop.getHtml();
  }

  addContent(idx: number) {
    this.data.list.forEach((content, index) => {
      content.content = this.editor._results[index].getHtml();
    });

    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.list);
    clone.splice(idx, 0, {
      title: '',
      content: '',
      hideContent: false
    });
    this.data.list = clone;

    setTimeout(() => {
      this.data.list.forEach((content, index) => {
        this.editor._results[index].setHtml(content.content);
      });
    }, 10);
  }

  deleteContent(idx: number) {
    this.data.list.splice(idx, 1);
    this.data.list = this.toolsService.copyObject(this.data.list);

    setTimeout(() => {
      this.data.list.forEach((content, index) => {
        this.editor._results[index].setHtml(content.content);
      });
    }, 10);
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
