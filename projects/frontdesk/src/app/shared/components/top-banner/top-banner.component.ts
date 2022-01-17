import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomRoute, LayoutMenuNode } from '../../../vvtk-core/interfaces';
import { PageMetaService } from '../../../vvtk-core/services';

@Component({
  selector: 'vvtk-top-banner',
  templateUrl: './top-banner.component.html',
  styleUrls: ['./top-banner.component.scss']
})
export class TopBannerComponent implements OnInit, OnChanges, OnDestroy {

  @Input() rootPath = null;
  @Input() contentPageTitle = null;

  // use for show contentPageTitle and not affect old code.
  @Input() highestPriorityTitle = null;

  breadcrumbs$: Subscription;
  breadcrumbs: LayoutMenuNode[] = [];

  bannerImgs$: Subscription;
  bannerImgs: CustomRoute;

  constructor(
    private router: Router,
    private pageMetaService: PageMetaService
  ) {
    this.bannerImgs$ = pageMetaService.banner$.subscribe(customRoute => {
      this.bannerImgs = customRoute;
    });
    this.breadcrumbs$ = pageMetaService.breadcrumbs$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  ngOnInit() {
    this.getBreads();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.rootPath && changes.rootPath.previousValue !== changes.rootPath.currentValue) {
      this.getBreads();
    }
  }

  getBreads() {
    this.pageMetaService.getBreads(
      this.rootPath || decodeURIComponent(this.router.url)
    );
  }

  ngOnDestroy() {
    if (this.bannerImgs$) {
      this.bannerImgs$.unsubscribe();
    }
    if (this.breadcrumbs$) {
      this.breadcrumbs$.unsubscribe();
    }
  }
}
