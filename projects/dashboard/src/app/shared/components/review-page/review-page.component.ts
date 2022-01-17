import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ReviewPageOpts,
  ReviewStatus
} from '../../../vvtk-core/classes/review';
import { AuthService } from '../../../vvtk-core/services/auth.service';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';

@Component({
  selector: 'vvtk-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit, OnDestroy {
  pageDraftIsViewable: boolean;
  pageReviewIsViewable: boolean;
  pagePublishIsViewable: boolean;

  @Input() opts: ReviewPageOpts;

  selectedLanguage$: Subscription;

  data: ReviewStatus;

  constructor(
    private authService: AuthService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService
  ) {}

  ngOnInit() {
    this.pageDraftIsViewable = this.sharedService.checkIsViewableByUrl(
      `${this.opts.routerPath}/content/draft`
    );
    this.pageReviewIsViewable = this.sharedService.checkIsViewableByUrl(
      `${this.opts.routerPath}/content/review`
    );
    this.pagePublishIsViewable = this.sharedService.checkIsViewableByUrl(
      `${this.opts.routerPath}/content/publish`
    );

    if (this.opts) {
      this.getSelectedLanguage();
    }
  }

  setOpts(opts: ReviewPageOpts) {
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

  getData() {
    this.vvtkService.get(
      { path: this.opts.apis.get },
      {
        next: resp => {
          const body = resp.json();
          if (body) {
            Object.keys(body).map(function(key, index) {
              const item = body[key];
              if (item) {
                item.updatedAt = item.updatedAt
                  ? item.updatedAt + '+00:00'
                  : null;
                item.submitedAt = item.submitedAt
                  ? item.submitedAt + '+00:00'
                  : null;
                item.reviewAt = item.reviewAt ? item.reviewAt + '+00:00' : null;
                item.rejectedAt = item.rejectedAt
                  ? item.rejectedAt + '+00:00'
                  : null;
                item.deleteAt = item.deleteAt ? item.deleteAt + '+00:00' : null;
                item.publishedAt = item.publishedAt
                  ? item.publishedAt + '+00:00'
                  : null;
              }
            });
            this.data = body;
          } else {
            this.data = {
              draft: null,
              review: null,
              publish: null
            };
          }
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
