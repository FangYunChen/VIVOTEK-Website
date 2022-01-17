import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ReviewData,
  ReviewPageContentOpts,
  ReviewUser
} from '../../../../vvtk-core/classes/review';
import { Sheet } from '../../../../vvtk-core/classes/table';
import { AuthService } from '../../../../vvtk-core/services/auth.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { TemplatesComponent } from '../../templates/templates.component';
import { VvtkApiService } from 'projects/dashboard/src/app/vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-review-page-content',
  templateUrl: './review-page-content.component.html',
  styleUrls: ['./review-page-content.component.scss']
})
export class ReviewPageContentComponent implements OnInit, OnDestroy {
  @ViewChild('editor') editor: any;
  @ViewChild('templates') templates: TemplatesComponent;

  @Input() opts: ReviewPageContentOpts;

  selectedLanguage$: Subscription;

  type: string;
  data: ReviewData;
  sheet: Sheet;
  reviewers: ReviewUser[];

  canSave = false;
  canSubmit = false;
  canDelete = false;
  canPass = false;
  canReject = false;

  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.data = {
      templates: [],
      content: '',
      file: {
        url: '',
        name: ''
      }
    };
  }

  ngOnInit() {
    const routeParams$ = this.route.params.subscribe(params => {
      this.type = params['type'].toLowerCase();
      this.getSelectedLanguage();
      if (this.type === 'draft') {
        this.getReviewers();
      }
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  setOpts(opts: ReviewPageContentOpts) {
    this.opts = opts;
    if (this.selectedLanguage$) {
      this.getData();
    }
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        if (this.opts) {
          this.getData();
        }
      }
    );
  }

  getReviewers() {
    this.vvtkService.getEditableAccountsByUrl(this.opts.apis.getReviewers, {
      next: resp => {
        const body = resp.json();
        if (body) {
          this.reviewers = body;
        }
      }
    });
  }

  getData() {
    const apiPath: string = this.opts.apis[this.type];
    this.vvtkService.get(
      { path: apiPath },
      {
        next: resp => {
          const body = resp.json();

          this.data = body || {
            templates: [],
            content: '',
            sheet: null,
            file: {
              url: '',
              name: ''
            }
          };
          if (this.opts.hasFile) {
            this.data.file = this.data.file || {
              url: '',
              name: ''
            };
          }
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

          if (!this.data.reviewer) {
            this.data.reviewer = {};
          }

          if (this.type !== 'publish') {
            this.getAuth();
          }
        }
      }
    );
  }

  getAuth() {
    this.canSave = false;
    this.canSubmit = false;
    this.canDelete = false;
    this.canPass = false;
    this.canReject = false;

    const draftEditable = this.authService.isEditable(
      `${this.opts.routerPath}/content/draft`
    );
    const reviewEditable = this.authService.isEditable(
      `${this.opts.routerPath}/content/review`
    );

    this.vvtkService.get(
      { path: this.opts.apis.getStatus },
      {
        next: resp => {
          let reviewStatus: number;
          const body = resp.json();
          if (!body) {
            reviewStatus = 2;
          } else if (!body.review || body.review.status === null) {
            reviewStatus = 2;
          } else {
            reviewStatus = body.review.status;
          }

          switch (this.type) {
            case 'draft':
              this.canSave = draftEditable;
              this.canSubmit =
                draftEditable && [1, 2, 3].indexOf(reviewStatus) > -1;
              break;
            case 'review':
              this.canDelete =
                (draftEditable || reviewEditable) &&
                [2, 3].indexOf(reviewStatus) === -1;
              this.canPass =
                reviewStatus === 0 &&
                this.data.reviewer.id === this.authService.userData.id;
              this.canReject =
                (draftEditable || reviewEditable) && reviewStatus === 0;
              break;
          }
        }
      }
    );
  }

  fileSelect($event) {
    const file: File = $event.target.files[0];
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `${this.opts.dirPath}/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => {
          this.data.file = {
            name: file.name,
            url: x.link
          };
        }
      );
  }

  sheetFileSelect($event) {
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
      },
      'uploaded'
    );
  }

  save() {
    this.isLoading = true;
    const newData: ReviewData = {};
    if (this.opts.hasFile) {
      newData.file = this.data.file;
    }
    if (this.opts.hasTemplate) {
      newData.templates = this.templates.getData();
    }
    if (this.opts.hasContent) {
      newData.content = this.editor.getHtml();
    }
    if (this.opts.hasSheet && this.sheet) {
      newData.sheet = JSON.stringify(this.sheet);
    }

    this.vvtkService.patch(
      {
        path: this.opts.apis.draft,
        action: 'Save'
      },
      newData,
      {
        next: resp => {
          this.router.navigate([this.opts.parentPath], {
            queryParams: this.opts.parentQuery
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  submit() {
    this.isLoading = true;
    const newData: ReviewData = {
      reviewer: this.data.reviewer.id,
      confirmUrl: `${document.location.origin}${this.router
        .createUrlTree([this.opts.parentPath], {
          queryParams: this.opts.parentQuery
        })
        .toString()}`
    };
    if (this.opts.hasFile) {
      newData.file = this.data.file;
    }
    if (this.opts.hasTemplate) {
      newData.templates = this.templates.getData();
    }
    if (this.opts.hasContent) {
      newData.content = this.editor.getHtml();
    }
    if (this.opts.hasSheet && this.sheet) {
      newData.sheet = JSON.stringify(this.sheet);
    }

    this.vvtkService.patch(
      {
        path: this.opts.apis.draft,
        action: 'Submit'
      },
      newData,
      {
        next: resp => {
          this.router.navigate([this.opts.parentPath], {
            queryParams: this.opts.parentQuery
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  delete() {
    this.isLoading = true;
    this.vvtkService.delete(
      { path: this.opts.apis.review },
      {
        next: resp => {
          this.router.navigate([this.opts.parentPath], {
            queryParams: this.opts.parentQuery
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  pass() {
    this.isLoading = true;
    this.vvtkService.patch(
      {
        path: this.opts.apis.review,
        action: 'Pass'
      },
      {},
      {
        next: resp => {
          this.router.navigate([this.opts.parentPath], {
            queryParams: this.opts.parentQuery
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  reject() {
    this.isLoading = true;
    const newData: ReviewData = {
      reviewNote: this.data.reviewNote,
      confirmUrl: `${document.location.origin}${this.router
        .createUrlTree([this.opts.parentPath], {
          queryParams: this.opts.parentQuery
        })
        .toString()}`
    };
    this.vvtkService.patch(
      {
        path: this.opts.apis.review,
        action: 'Reject'
      },
      newData,
      {
        next: resp => {
          this.router.navigate([this.opts.parentPath], {
            queryParams: this.opts.parentQuery
          });
        },
        finally: () => {
          this.isLoading = false;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }

  updateEditorHtml() {
    this.data.content = this.editor.getHtml();
  }
}
