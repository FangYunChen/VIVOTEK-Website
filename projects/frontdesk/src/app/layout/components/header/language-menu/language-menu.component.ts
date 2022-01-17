import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { I18nService, VvtkService } from '@frontdesk/core/services';
import { LanguageMenu } from '@frontdesk/core/interfaces/layout-menu-node';

@Component({
  selector: 'vvtk-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent implements OnInit {
  @Input() languageMask; // language
  _MenuNode: LanguageMenu[] = [];

  @Output() languageWindow = new EventEmitter<any>(); // language

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private i18nService: I18nService
  ) {}

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Menu/Languages',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            this.setLayoutMenuNode(resp.json());
          }
        }
      }
    );
  }

  setLayoutMenuNode(MenuNode: LanguageMenu[]) {
    this._MenuNode = MenuNode;

    $('.language').height(Math.ceil((MenuNode[0].countries.length / 3 + 1)) * 70);
    $('.language-list').height(Math.ceil((MenuNode[0].countries.length / 3 + 1)) * 70 - 90);
  }

  // language close
  closeLanguage($event) {
    this.languageMask = false;
    this.languageWindow.emit(this.languageMask);
  }

  switchLanguage(code: string) {

    console.log(`切換語系到 ${code}`);
    this.i18nService.deleteCookie('vivoteklang');
    this.i18nService.setCookie('vivoteklang', code, 36500, '/');
    console.log(this.i18nService.getCookie('vivoteklang'));
    this.i18nService.changeLanguage(code);
  }

  getCountryName(country) {
    if (country.name === country.language) {
      return country.language;
    } else {
      return `${country.language}`;
    }
  }
}
