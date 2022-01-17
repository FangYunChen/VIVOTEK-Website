import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportAricleContent } from '@frontdesk/core/interfaces/support-article';
import { VvtkApiService } from '@frontdesk/core/services/vvtk-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupportBreadcrumbService } from '../../support-breadcrumb.service';

@Component({
  selector: 'vvtk-knowledge-content',
  templateUrl: './knowledge-content.component.html',
  styleUrls: ['./knowledge-content.component.scss']
})
export class KnowledgeContentComponent implements OnInit, OnDestroy {

  tagNavigateRoutePrefix = '';
  article$: Observable<SupportAricleContent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private supportBreadcrumbService: SupportBreadcrumbService
  ) { }

  ngOnInit() {
    this.tagNavigateRoutePrefix = `${this.router.url.split('/support/')[0]}/support/`;
    this.supportBreadcrumbService.path = '/knowledge';
    this.route.params.subscribe(p => {
      this.article$ = this.vvtkApiService.post<SupportAricleContent>({
        path: 'api/Support/Articles/BySubRoute'
      }, { subRoute: p.article }).pipe(
        tap(a => this.supportBreadcrumbService.contentPageTitle = a.headline)
      );
    });
  }

  ngOnDestroy() {
    this.supportBreadcrumbService.clearBreadcrumbValue();
  }

}
