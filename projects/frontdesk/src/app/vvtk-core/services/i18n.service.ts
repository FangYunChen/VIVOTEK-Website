import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { sprintf } from 'sprintf-js';
import { AuthService } from './auth.service';
import { catchError, finalize } from 'rxjs/operators';
import { UserLoginViewModel } from '../interfaces';

const en: Object = require('./i18n/en.json');
const de: Object = require('./i18n/de.json');
const es: Object = require('./i18n/es.json');
const ja: Object = require('./i18n/jp.json');
const jp: Object = require('./i18n/jp.json');
const zhHant: Object = require('./i18n/zh-Hant.json');
const fr: Object = require('./i18n/fr.json');
const ir: Object = require('./i18n/ir.json');
const pt: Object = require('./i18n/pt.json');
const ru: Object = require('./i18n/ru.json');
const ar: Object = require('./i18n/ar.json');
const zhHans: Object = require('./i18n/zh-Hans.json');

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  i18nData: {
    [lang: string]: Object;
  } = {
    en: en,
    de: de,
    es: es,
    ja: ja,
    jp: jp,
    'zh-Hant': zhHant,
    fr: fr,
    ir: ir,
    pt: pt,
    ru: ru,
    ar: ar,
    'zh-Hans': zhHans
  };

  i18nDataInternal: {
    [lang: string]: Object;
  } = {
    de: de,
    ja: ja,
    jp: jp,
    fr: fr,
    ir: ir,
    pt: pt,
    ru: ru,
    ar: ar,
    'zh-Hans': zhHans
  };

  i18nDataOpen: {
    [lang: string]: Object;
  } = {
    en: en,
    es: es,
    'zh-Hant': zhHant
  };

  private selectedLanguage = new BehaviorSubject<any>('global');
  selectedLanguage$ = this.selectedLanguage.asObservable();
  userSub$: Subscription;
  
  constructor(private router: Router, private route: ActivatedRoute,private authService: AuthService) {}

  setSelectedLanguage(change: string) {
    if (!this.i18nData[change] && change !== 'global' && change !== '') {
      const redirectPath = this.route.snapshot.url
        .map(path => path.path)
        .join(' ');
      this.router.navigate(['/404'], {
        queryParams: {
          q: `${change} ${redirectPath}`
        }
      });
      return;
    }
    if(this.i18nDataInternal[change]){
      this.authService
      .getUserData()
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          if (this.userSub$) {
            this.userSub$.unsubscribe();
          }
        })
      ).subscribe((userLoginData: UserLoginViewModel) => {
        const redirectPath = this.route.snapshot.url
            .map(path => path.path)
            .join(' ').replace(this.i18nDataInternal[change] + '/','');
          console.log(this.router.url.split('#')[0].replace('/' + change,''));
          if(userLoginData == null){
            //this.router.navigate([this.router.url.split('#')[0].replace('/' + change,'')]);
            this.router.navigate(['/404'], {
              queryParams: {
                q: `${change} ${redirectPath}`
              }
            });
          } else if(userLoginData.email.indexOf('@vivotek.com') < 0 ){
            //this.router.navigate([this.router.url.split('#')[0].replace('/' + change,'')]);
            this.router.navigate(['/404'], {
              queryParams: {
                q: `${change} ${redirectPath}`
              }
            });
          }
        }
      )
    }
    this.selectedLanguage.next(change);
  }

  getSelectedLanguageForLink() {
    return this.selectedLanguage.value === 'global'
      ? ''
      : `/${this.selectedLanguage.value}`;
  }

  getSelectedLanguage() {
    return this.selectedLanguage.value === 'global'
      ? ''
      : `${this.selectedLanguage.value}`;
  }

  getI18n(key: string, ...arg: string[]) {
    let value: string;
    if (
      this.selectedLanguage.getValue() === 'global' ||
      !this.i18nData[this.selectedLanguage.getValue()][key]
    ) {
      value = key;
    } else {
      value = this.i18nData[this.selectedLanguage.getValue()][key];
    }
    return sprintf(value, ...arg);
  }

  changeLanguage(change: string) {
    // 語言一樣 不切換
    if (change === this.selectedLanguage.getValue()) {
      return;
    }

    const lang = this.selectedLanguage.getValue();
    let path = decodeURIComponent(this.router.url.substr(1));

    // 從自訂網址轉成預設網址
    // environment['customRoutes']是舊的東西，現在似乎沒作用，先觀察一下。
    // if (environment['customRoutes'].length > 0) {
    //   const customRoute = environment['customRoutes'].filter(item => {
    //     return item.customPath === path;
    //   });
    //   if (customRoute.length > 0) {
    //     path = customRoute[0].referPath;
    //   }
    // }

    // 預設網址轉語系
    if (change === 'global') {
      if (path === lang) {
        path = path.replace(`${lang}`, '');
      } else {
        path = path.replace(`${lang}/`, '');
      }
    } else if (lang === 'global') {
      path = `${change}/${path}`;
    } else {
      path = path.replace(lang, change);
    }

    // 預設網址轉自訂網址
    // environment['customRoutes']是舊的東西，現在似乎沒作用，先觀察一下。
    // if (environment['customRoutes'].length > 0) {
    //   const customRoute = environment['customRoutes'].filter(item => {
    //     return item.referPath === path;
    //   });
    //   if (customRoute.length > 0) {
    //     path = customRoute[0].customPath;
    //   }
    // }

    path = `/${path}`;

    window.location.href = path;
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length, c.length);
        }
    }
      return '';
  }

  deleteCookie(name) {
    this.setCookie(name, '', -1, '/');
  }

  setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}
