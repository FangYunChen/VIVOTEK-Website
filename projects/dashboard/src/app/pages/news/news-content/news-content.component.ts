import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { News } from '../../../vvtk-core/classes/news';
import { NewsTag } from '../../../vvtk-core/classes/newsTag';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

declare var moment: any;

@Component({
  selector: 'vvtk-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.scss']
})
export class NewsContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  @ViewChild('editor') editor: any;
  id: number;
  news: News;
  status: boolean;
  newsTags: NewsTag[] = [];

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.news = {
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      description: '',
      publishAt: '',
      status: 1,
      tags: [],
      content: '',
      related: []
    };
    this.status = true;
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    // this.getNewsTags();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.getNewsTags();
        if (this.id > 0) {
          this.getNews();
        }
      }
    );
  }

  getNewsTags() {
    const lang = this.id === 0 ? 'global' : null;

    this.vvtkService.get(
      {
        path: `api/News/Tags`,
        language: lang
      },
      {
        next: resp => {
          const body = resp.json();
          this.newsTags = body;
        }
      }
    );
  }

  getNews() {
    this.vvtkService.get(
      {
        path: `api/News/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          body.tags = body.tags.map((tag, idx) => {
            return tag.id;
          });
          body.related = body.related || [];
          this.news = body;
          this.status = body.status === 1;
          this.editor.setHtml(this.news.content);
        }
      }
    );
  }

  updateEditorHtml() {
    this.news.content = this.editor.getHtml();
  }

  getTagsName(tags: number[]) {
    const tagStrs: string[] = [];
    tags.forEach(tag => {
      const find = this.newsTags.find(newsTag => {
        return newsTag.id === tag;
      });
      if (find) {
        tagStrs.push(find.name);
      }
    });

    return tagStrs.join(', ');
  }

  save() {
    this.isLoading = true;
    this.updateEditorHtml();
    this.news.publishAt = moment(this.news.publishAt).format();
    this.news.status = this.status ? 1 : 0;
    this.news.related.forEach((related, idx) => {
      related.publishAt = moment(related.publishAt).format();
    });

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/News`,
          language: this.selectedLanguage
        },
        this.news,
        {
          next: resp => {
            this.router.navigate(['/news/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/News/${this.id}`
        },
        this.news,
        {
          next: resp => {
            this.router.navigate(['/news/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.news.image.title = file.name;
    this.news.image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `News/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.news.image.src = x.link
      );
  }

  relatedImgFileSelect($event, i: number) {
    const file: File = $event.target.files[0];
    this.news.related[i].image.title = file.name;
    this.news.related[i].image.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `News/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.news.related[i].image.src = x.link
      );
  }

  addRelated(idx: number) {
    if (this.news.related.length >= 3) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.news.related);
    clone.splice(idx, 0, {
      id: 0,
      title: '',
      image: {
        src: '',
        alt: '',
        title: ''
      },
      publishAt: '',
      url: ''
    });
    this.news.related = clone;
  }

  deleteRelated(i: number) {
    this.news.related.splice(i, 1);
    this.news.related = this.toolsService.copyObject(this.news.related);
  }

  typeof(obj) {
    return typeof obj;
  }
  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
