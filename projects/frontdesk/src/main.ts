import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { LanguageService } from '@frontdesk/core/services/language.service';

if (environment.production) {
  enableProdMode();
}

fetch(`${environment.apiUrl}/api/Languages?scope=all`)
  .then(res => res.json())
  .then(json => {
    LanguageService.languageList = json;
  })
  .catch(error => {
    console.error('Could not get languages from API!', error);
  })
  .then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule)
      .catch(err => console.log(err));
  });
