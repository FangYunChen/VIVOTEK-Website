import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { I18nService } from '../../../vvtk-core/services/i18n.service';
import { PageMetaService } from '../../../vvtk-core/services/page-meta.service';

@Component({
  selector: 'vvtk-i18n',
  templateUrl: './i18n.component.html',
  styleUrls: ['./i18n.component.scss']
})
export class I18nComponent implements OnInit, OnDestroy {
  routeParams$: Subscription;
  routerEvents$: Subscription;

  lang: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private i18nService: I18nService,
    private pageMetaService: PageMetaService
  ) {
    this.routeParams$ = this.route.params.subscribe(params => {
      this.lang = params['lang'] || this.route.snapshot.data['lang']; // 用自訂路由進來的參數需用 this.route.snapshot.data 取得
      if (!this.lang) {
        this.lang = 'global';
      }
      this.i18nService.setSelectedLanguage(this.lang);
    });
    this.routerEvents$ = router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        pageMetaService.setPageSettingByUrl(event.url);
      });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.routeParams$) {
      this.routeParams$.unsubscribe();
    }
    if (this.routerEvents$) {
      this.routerEvents$.unsubscribe();
    }
  }
}
