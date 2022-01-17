import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, fromEvent as observableFromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Page, PageSetting } from '../../../vvtk-core/classes/page';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { PageService } from '../page.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';

@Component({
  selector: 'vvtk-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit, OnDestroy {
  pageContentIsEditable: boolean;
  pageContentIsViewable: boolean;

  @ViewChild('filter') filter: ElementRef;
  filter$: Subscription;
  filterText = '';

  selectedLanguage$: Subscription;
  selectedLanguage = '';

  pages: Page[] = [];
  filterPages: Page[] = [];

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private pageService: PageService,
    private toolsService: ToolsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.pageContentIsEditable = this.sharedService.checkIsEditableByUrl(
      '/page/content'
    );
    this.pageContentIsViewable = this.sharedService.checkIsViewableByUrl(
      '/page/content'
    );

    this.getPages();

    this.filter$ = observableFromEvent(this.filter.nativeElement, 'keyup')
      .pipe(debounceTime(150), distinctUntilChanged())
      .subscribe(() => {
        this.filterText = this.filter.nativeElement.value;
        this.filterSetting();
      });
  }

  get frontUrl() {
    return environment.frontUrl;
  }

  getPages() {
    this.vvtkApiService.get({
      path: 'api/Pages',
      // query: {
      //   frontendRoutesUri: `${environment.frontUrl}/routes.json`
      // },
      disableLanguage: true
    }).subscribe(data => {
      this.pages = data;
      this.pages = this.pages.filter(page => {
        return page.path !== '' && page.path.indexOf('*') === -1;
      });
      this.pages.sort((a, b) => {
        return a.path > b.path ? 1 : -1;
      });
      this.pages.forEach(page => {
        page.settingList = [];
        page.referPathList.forEach(referPath => {
          page.settingList.push({
            id: 0,
            referPath: referPath,
            path: page.path,
            show: {
              referPath: '',
              customPath: '',
              title: ''
            },
            imgPcSrc: '',
            imgTabletSrc: '',
            imgMobileSrc: '',
            i18n: []
          });
        });
      });
      this.getSettings();
    });
  }

  getSettings() {
    this.vvtkApiService.get({
      path: 'api/PageSettings/View',
      disableLanguage: true
    }).subscribe(data => {
      data.forEach((pageSetting: PageSetting) => {
        this.pages.forEach(page => {
          if (page.path === pageSetting.path) {
            page.settingList.forEach(setting => {
              if (setting.referPath === pageSetting.referPath) {
                setting.id = pageSetting.id;
                setting.imgPcSrc = pageSetting.imgPcSrc;
                setting.imgTabletSrc = pageSetting.imgTabletSrc;
                setting.imgMobileSrc = pageSetting.imgMobileSrc;
                setting.i18n = pageSetting.pageSettingI18n;
              }
            });
          }
        });
      });
      this.getSelectedLanguage();
    });
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.setSettingShow();
      }
    );
  }

  setSettingShow() {
    const langString: string =
      this.selectedLanguage === 'global' ? '' : `${this.selectedLanguage}/`;
    this.pages.forEach(page => {
      page.settingList.forEach(setting => {
        setting.show.referPath = `${langString}${setting.referPath}`;
        setting.show.customPath = '';
        setting.show.title = '';
        setting.i18n.forEach(i18n => {
          if (i18n.lang === this.selectedLanguage) {
            setting.show.customPath = i18n.customPath || '';
            setting.show.title = i18n.title || '';
          }
        });
      });
    });
    this.pageService.pages = this.pages;
    this.filterSetting();
  }

  filterSetting() {
    this.filterPages = [];
    this.pages.forEach(page => {
      const filterSettings: PageSetting[] = [];
      page.settingList.forEach(setting => {
        const searchStr = (
          this.frontUrl +
          '/' +
          setting.show.referPath +
          setting.show.customPath +
          setting.show.title
        ).toLowerCase();
        if (searchStr.indexOf(this.filterText.toLowerCase()) !== -1) {
          filterSettings.push(setting);
        }
      });
      if (filterSettings.length > 0) {
        this.filterPages.push({
          path: page.path,
          referPathList: page.referPathList,
          settingList: filterSettings
        });
      }
    });
  }

  edit(setting: PageSetting) {
    this.pageService.pageSetting = setting;
    this.router.navigate(['/page/content']);
  }

  /**
   * 此功能待確認是否過時，應該廢棄?
   */
  updateFrontSetting() {
    this.vvtkApiService.get({
      path: 'api/PageSettings/UpdateFront',
      disableLanguage: true
    }).subscribe(data => {
      if (data.indexOf('Reload custom-routes.json success!') > -1) {
        this.toolsService.showSnackBar(
          'Reload custom-routes.json success!',
          3000
        );
      } else {
        this.toolsService.showSnackBar(
          'Reload custom-routes.json ERROR!',
          30000
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
    if (this.filter$) {
      this.filter$.unsubscribe();
    }
  }
}
