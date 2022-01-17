import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-investors-shareholder-shareholder',
  templateUrl: './investors-shareholder-shareholder.component.html'
})
export class InvestorsShareholderShareholderComponent
  implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChildren('editor') editor: any;
  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  years: number[] = [];
  year: number;

  dirPath = 'Investors/Shareholder/Shareholder';

  data: PageData[] = [];
  nowEditor = -1;

  isLoading = false;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService
  ) {
    for (let i = 1997; i <= new Date().getFullYear() + 3; i++) {
      this.years.push(i);
    }
    this.years.reverse();
    this.year = this.years[3];
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

  changeYear() {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.vvtkService.get(
      { path: 'api/Investors/Shareholder/Shareholder' },
      {
        next: resp => {
          const body = resp.json();
          const dataList: PageDataList[] = body;
          const find = dataList.find(data => {
            return data.year === this.year;
          });
          if (find) {
            this.data = find.contents;
            setTimeout(() => {
              this.data.forEach((content, idx) => {
                this.editor._results[idx].setHtml(content.content);
              });
            }, 10);
          } else {
            this.data = [];
          }
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  updateEditorHtml(i: number) {
    this.data[i].content = this.editor._results[i].getHtml();
  }

  save() {
    this.isLoading = true;

    this.data.forEach((content, idx) => {
      content.content = this.editor._results[idx].getHtml();
    });

    this.vvtkService.patch(
      {
        path: `api/Investors/Shareholder/Shareholder/${this.year}`
      },
      this.data,
      {
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  addContent(idx: number) {
    this.data.forEach((content, index) => {
      content.content = this.editor._results[index].getHtml();
    });

    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data);
    clone.splice(idx, 0, {
      title: '',
      content: '',
      hideContent: false
    });
    this.data = clone;

    setTimeout(() => {
      this.data.forEach((content, index) => {
        this.editor._results[index].setHtml(content.content);
      });
    }, 10);
  }

  deleteContent(idx: number) {
    this.data.splice(idx, 1);
    this.data = this.toolsService.copyObject(this.data);

    setTimeout(() => {
      this.data.forEach((content, index) => {
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

class PageDataList {
  year: number;
  contents: PageData[];
}
class PageData {
  title: string;
  content: string;
  hideContent: boolean;
}
