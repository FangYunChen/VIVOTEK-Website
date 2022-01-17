import { Component } from '@angular/core';
import { I18nService } from './vvtk-core/services';

@Component({
  selector: 'vvtk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private i18nService: I18nService) {
    if(window.location.href.indexOf('/register-verification') > 0){
      return;
    }
    if(window.location.href.indexOf('/forget-password') > 0){
      return;
    }
    try {
      // detect window.navigator.languages
      let found = false;
      if (typeof(window.navigator.languages) === 'object') {
        for (let index in window.navigator.languages) {
          console.log(window.navigator.languages[index].toLowerCase());
          found = this.switchPage(window.navigator.languages[index].toLowerCase());
          if (found) { break; }
        }
      }

      if (!found) {
        let lang = window.navigator.language;
        let relang = lang.toLowerCase();
        found = this.switchPage(relang);
      }
    } catch (e) {
    }


  }

  switchPage(language) {
    let lancookie = this.i18nService.getCookie('vivoteklang');
    if (lancookie !== '') {
      console.log(this.i18nService.getCookie('vivoteklang'));
      if (lancookie === 'global') {
        return true;
      } else {
        if (window.location.href.indexOf('/zh-Hant') < 0 && window.location.href.indexOf('/es') < 0 && window.location.href.indexOf('/en') < 0) {
          window.location.href = '/' + lancookie + window.location.pathname;
        }
      }
      return true;
    } else {
      switch (language) {
        case 'zh':
        case 'zh-tw':
          console.log('/zh-TW' + window.location.pathname);
          if (window.location.href.indexOf('/zh-Hant') < 0 && window.location.href.indexOf('/es') < 0 && window.location.href.indexOf('/en') < 0) {
            window.location.href = '/zh-Hant' + window.location.pathname;
          }
          return true;
          break;
        case 'es':
        console.log('/es' + window.location.pathname);
          if (window.location.href.indexOf('/zh-Hant') < 0 && window.location.href.indexOf('/es') < 0 && window.location.href.indexOf('/en') < 0) {
            window.location.href = '/es' + window.location.pathname;
          }
          return true;
          break;
        default:
          return true;
        }
     }

    return false;
  }
}
