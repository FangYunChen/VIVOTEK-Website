import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageMetaService } from '.';
import { MetaTag } from '../interfaces/meta-tag';
import { PageSetting } from '../interfaces/page-settings';
import { VvtkApiService } from './vvtk-api.service';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class PageSettingService {
  lastMetaTags = [];
  lastJsonld;

  constructor(
    private pageMetaService: PageMetaService,
    private vvtkApiService: VvtkApiService,
    private i18nService: I18nService
  ) { }

  setSEOTags(setting: PageSetting) {
    if (setting) {
      this.pageMetaService.setTitle(setting.title);
      const metaTags = (JSON.parse(setting.meta) as MetaTag[]) || [];

      this.removeSEOTags();
      const nodes = this.pageMetaService.setMeta(metaTags);
      this.lastMetaTags = nodes;

      const jsonld = this.pageMetaService.setJsonld(setting.jsonLd);
      this.lastJsonld = jsonld;
    } else {
      this.pageMetaService.setTitle('');
      this.removeSEOTags();
    }
  }

  removeSEOTags() {
    this.pageMetaService.removeMeta(this.lastMetaTags);
    this.pageMetaService.removeJsonld(this.lastJsonld);
  }

  setCanonicalLink() {

    const oldCanonical = document.querySelectorAll('link[rel=canonical]');
    Array.from(oldCanonical).forEach((tag) => tag.remove());

    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = document.URL;
    const s = document.getElementsByTagName('link')[0];
    s.parentNode.insertBefore(link, s);
  }

  getPageSettingByPath(path: string): Observable<PageSetting> {
    const langUrl = this.i18nService.getSelectedLanguageForLink();
    const postData = { path: path.replace(langUrl, '').replace('/', '') };
    return this.vvtkApiService.post<PageSetting>({
      path: 'api/PageSettings/View',
    }, postData);
  }

}
