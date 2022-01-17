import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sheet } from '../../../../../vvtk-core/classes/table';
import { VvtkService } from '../../../../../vvtk-core/services/vvtk.service';
import { SharedService } from '../../../../../vvtk-core/services/shared.service';
import { TemplatesComponent } from '../../../../../shared/components/templates/templates.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators';

@Component({
  selector: 'vvtk-feature-article-content',
  templateUrl: './feature-article-content.component.html',
  styleUrls: ['./feature-article-content.component.scss']
})
export class FeatureArticleContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  @ViewChild('editor')
  editor: any;
  @ViewChild('templates')
  templates: TemplatesComponent;

  opts = {
    id: '',
    title: 'Feature Article',
    dirPath: 'Supports/Learning/FeatureArticleList',
    apis: {
      get: 'api/Supports/Learning/FeatureArticleList',
      post: 'api/Supports/Learning/FeatureArticleList',
      patch: 'api/Supports/Learning/FeatureArticleList'
    }
  };

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  data = {
    id: 0,
    linkText: '',
    description: '',
    content: '',
    sheet: null,
    templates: []
  };
  sheet: Sheet;

  isLoading = false;
  public tabname: string;

  constructor(
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const splitArray = event['url'].split('/');
        this.opts.id = splitArray[splitArray.length - 1];
      });
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;
    this.getSelectedLanguage();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.opts.id !== '0') {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      { path: this.opts.apis.get + '/' + this.opts.id, disableLanguage: false },
      {
        next: resp => {
          const body = resp.json();
          this.data = body || {
            templates: [],
            content: '',
            sheet: null
          };
          this.data.templates = this.data.templates || [];
          this.templates.setData(this.data.templates);
        }
      }
    );
  }

  save() {
    this.isLoading = true;
    this.data.templates = this.templates.getData();
    if (this.opts.id === '0') {
      this.vvtkService.post(
        {
          path: this.opts.apis.patch
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/feature-article']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: this.opts.apis.patch + '/' + this.opts.id,
          disableLanguage: false
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/supports/learning/feature-article']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
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
