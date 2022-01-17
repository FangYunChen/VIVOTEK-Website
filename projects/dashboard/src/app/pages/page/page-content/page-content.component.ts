import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  Page,
  PageSetting,
  PageSettingI18n,
  PageSettingMeta
} from '../../../vvtk-core/classes/page';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { PageService } from '../page.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage = '';

  pages: Page[];
  data: PageSetting;
  i18n: PageSettingI18n;

  settingStr: string;

  metaStr: string;
  meta: PageSettingMeta[] = [];

  isLoading = false;

  constructor(
    private vvtkApiService: VvtkApiService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private pageService: PageService,
    private router: Router
  ) {
    if (!pageService.pageSetting) {
      this.router.navigate(['/page/list']);
    }
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getSelectedLanguage();
  }

  getUrl() {
    let url: string = environment.frontUrl + '/';
    if (this.selectedLanguage !== 'global') {
      url += this.selectedLanguage + '/';
    }
    url += this.data.referPath;

    return url;
  }

  getData() {
    this.pages = this.pageService.pages;
    this.data = JSON.parse(JSON.stringify(this.pageService.pageSetting));
    this.filterSetting();
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        this.getData();
      }
    );
  }

  filterSetting() {
    const filter = this.data.i18n.filter(i18n => {
      return i18n.lang === this.selectedLanguage;
    });
    if (filter.length > 0) {
      this.i18n = filter[0];
    } else {
      this.i18n = {
        lang: this.selectedLanguage,
        customPath: '',
        title: '',
        meta: '',
        jsonLd: '',
        imgPcAlt: '',
        imgPcTitle: '',
        imgTabletAlt: '',
        imgTabletTitle: '',
        imgMobileAlt: '',
        imgMobileTitle: ''
      };
      this.data.i18n.push(this.i18n);
    }
    this.meta = this.i18n.meta ? JSON.parse(this.i18n.meta) : [];
  }

  setSetting() {
    const setting: PageSettingI18n = JSON.parse(this.settingStr);
    Object.assign(this.i18n, setting);
  }

  getSetting() {
    this.i18n.meta = JSON.stringify(this.meta);

    const setting: PageSettingI18n = JSON.parse(JSON.stringify(this.i18n));
    delete setting.lang;
    this.settingStr = JSON.stringify(setting);
  }

  getMeta() {
    this.metaStr = JSON.stringify(this.meta);
  }

  setMeta() {
    let meta: any;
    try {
      meta = JSON.parse(this.metaStr);
    } catch (error) {
      this.toolsService.showSnackBar('Json parse error: ' + error, 10000);
      return;
    }

    if (meta instanceof Array) {
      for (let i = 0; i < meta.length; i++) {
        if (
          !meta[i].tagName ||
          !meta[i].attr ||
          !(meta[i].attr instanceof Array)
        ) {
          this.toolsService.showSnackBar('Some item is not Meta', 10000);
          return;
        }
      }
    } else {
      this.toolsService.showSnackBar('Input is not Array', 10000);
      return;
    }

    this.meta = meta;
    console.log('OK');
  }

  save() {
    // let samePath: string = null;
    // this.pages.forEach(page => {
    //   page.settingList.forEach(setting => {
    //     setting.i18n.forEach(i18n => {
    //       if (
    //         i18n.customPath === this.i18n.customPath &&
    //         (i18n.lang !== this.i18n.lang ||
    //           setting.referPath !== this.data.referPath)
    //       ) {
    //         samePath = `${setting.referPath}(${i18n.lang})`;
    //       }
    //     });
    //   });
    // });
    // if (samePath) {
    //   this.toolsService.showSnackBar(
    //     `This custom path is same of ${samePath}`,
    //     10000
    //   );
    //   return;
    // }
    try {
      const jsonLd = JSON.parse(this.i18n.jsonLd);
    } catch (error) {
      this.toolsService.showSnackBar(
        'Json parse error (jsonLd): ' + error,
        10000
      );
      return;
    }
    this.i18n.meta = JSON.stringify(this.meta);
    this.i18n.customPath = this.i18n.customPath || '';

    this.data.pageSettingI18n = this.data.i18n;

    this.isLoading = true;
    this.vvtkApiService.post({
      path: `api/PageSettings`
    }, this.data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(_ => this.router.navigate(['/page/list']));
  }

  // banner區塊用不到所以註解掉，也許以後會需要?
  // imgFileSelect($event, imgName: string) {
  //   const file: File = $event.target.files[0];
  //   this.i18n[`${imgName}Title`] = file.name;
  //   this.i18n[`${imgName}Alt`] = file.name;
  //   this.isLoading = true;

  //   this.vvtkApiService.uploadFile(file, `Page/${file.name}`)
  //     .pipe(
  //       finalize(() => {
  //         this.isLoading = false;
  //         $event.target.value = null;
  //       })
  //     )
  //     .subscribe(
  //       x => this.data[`${imgName}Src`] = x.link
  //     );
  // }

  addMeta(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.meta);
    clone.splice(idx, 0, {
      tagName: '',
      attr: []
    });
    this.meta = clone;
  }

  deleteMeta(idx: number) {
    this.meta.splice(idx, 1);
    this.meta = this.toolsService.copyObject(this.meta);
  }

  addAttribute(metaIdx: number, attrIdx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.meta[metaIdx].attr);
    clone.splice(attrIdx, 0, {
      name: '',
      value: ''
    });
    this.meta[metaIdx].attr = clone;
  }

  deleteAttribute(metaIdx: number, attrIdx: number) {
    this.meta[metaIdx].attr.splice(attrIdx, 1);
    this.meta[metaIdx].attr = this.toolsService.copyObject(
      this.meta[metaIdx].attr
    );
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
