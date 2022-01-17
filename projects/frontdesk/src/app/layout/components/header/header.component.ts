import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  AuthGuard,
  AuthService,
  I18nService,
  PageMetaService
} from '../../../vvtk-core/services';
declare var $: any;

@Component({
  selector: 'vvtk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  styleHeader: string[];

  searchMask = false; // search
  languageMask = false; // language
  sidemenuMask = false; // side-menu
  langCount = 0;
  adminPanelLink = environment.adminPanelURL;
  @Input() signMask; // sign
  @Output() signWindow = new EventEmitter<any>(); // sign

  headerStyle$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    public i18nService: I18nService,
    private pageMetaService: PageMetaService,
    private authGuard: AuthGuard,
    @Inject(DOCUMENT) private document
  ) {
    this.headerStyle$ = pageMetaService.headerStyle$.subscribe(text => {
      this.styleHeader = text;
    });
  }

  ngOnInit() {}

  // search open
  searchWindow($event) {
    this.searchMask = !this.searchMask;
  }

  search($event) {
    this.searchMask = false;
    (document as HTMLDocument).location.href = this.i18nService.getSelectedLanguageForLink() + `/search-page/?q=${encodeURI(
      $event.target.value
    )}`;
    // this.router.navigate([this.pageMetaService.getCustomPath('/search-page')], {
    //   queryParams: { q: $event.target.value }
    // });

    // if (window['google'] !== undefined) {
    //   const searchresults = window['google'].search.cse.element.getElement(
    //     'searchresults-only0'
    //   );

    //   searchresults.execute($event.target.value || '');
    // }
  }

  // sidemenu open
  openSidemenu($event) {
    this.sidemenuMask = true;
  }
  sidemenuWindow(sidemenuMask) {
    this.sidemenuMask = sidemenuMask;
  }
  // Language open
  openLanguage($event) {
    this.languageMask = true;
    if (this.langCount <= 0) {
      setTimeout(() => {
        const langHeight = $('.language-height').height();
        $('.language-height').height(langHeight / 3 + 20);
        $('.CustomScrollbar').mCustomScrollbar({
          scrollbarPosition: 'outside',
          axis: 'y',
          advanced: {
            autoExpandHorizontalScroll: true
          }
        });
      }, 1);
      this.langCount++;
    }
  }
  languageWindow(languageMask) {
    this.languageMask = languageMask;
  }
  // sign open
  openSign($event) {
    this.signMask = true;
    this.signWindow.emit(this.signMask);
  }

  // 登出
  signOut() {
    this.authService.logout();

    // 重新檢查權限
    this.authGuard.canActivate(
      this.route.snapshot,
      this.router.routerState.snapshot
    );
  }

  get showAdminPanelLink(): boolean {
    return this.authService.isViewable(environment.adminPanelModuleId);
  }

  ngOnDestroy() {
    if (this.headerStyle$) {
      this.headerStyle$.unsubscribe();
    }
  }
}
