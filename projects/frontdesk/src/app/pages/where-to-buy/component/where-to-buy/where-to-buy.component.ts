import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { I18nService, VvtkService } from '@frontdesk/core/services';
import { I18nPipe } from '@frontdesk/shared/pipes/i18n.pipe';

@Component({
  selector: 'vvtk-where-to-buy',
  templateUrl: './where-to-buy.component.html',
  styleUrls: ['./where-to-buy.component.scss']
})
export class WhereToBuyComponent implements OnInit {
  continents = [];

  tabList = [];

  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  tabsCount = 5;
  slideIndex = 0;
  searchSelect = false;

  tabsOpen = 'tabs01';
  filterBox = false;

  searchString = '';

  AutoCompliWord: {
    title: { lang: string; filterText: string[] }[];
    tag: { lang: string; filterText: string[] }[];
  } = { title: [], tag: [] };
  CompliWord = [];
  WaittingAutoCompleteTimeout = false;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private i18nService: I18nService,
    private vvtkService: VvtkService
  ) {}

  ngOnInit() {
    this.setContinents();
    for (const key in this.AutoCompliWord) {
      if (this.AutoCompliWord.hasOwnProperty(key)) {
        this.setAutoCompliWord(key);
      }
    }
  }
  setContinents() {
    this.vvtkService.get(
      {
        path: 'api/buy/Where/Countries',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            this.continents = resp.json();
            if (
              !this.continents.find(continent => {
                const hasUSA = continent.countries.find(country => {
                  return country.country === 'United States';
                });
                return hasUSA;
              })
            ) {
              this.continents.push({
                continent: 'North and Central America',
                countries: [
                  {
                    countryId: 'USA',
                    country: 'USA'
                  }
                ]
              });
            }
            this.tabList = [];
            const i18n = new I18nPipe(this.i18nService);
            this.continents.forEach(c => {
              this.tabList.push(i18n.transform(c.continent));
            });
            if (this.tabList.length > 0) {
              this.tabsOpen = 'tabs' + this.tabList[0];
            }
          }
        }
      }
    );
  }

  setAutoCompliWord(filterType: string) {
    this.vvtkService.get(
      {
        path: 'api/Buy/Where/FilterText',
        query: `searchBy=${filterType}`,
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const data = resp.json();
            data.forEach(el => {
              this.AutoCompliWord[filterType].push({
                lang: el['lang'],
                filterText: el['filterText']
              });
            });
          }
        }
      }
    );
  }

  tabsChange(tabsOpen) {
    this.tabsOpen = '';
    this.tabsOpen = tabsOpen;
    this.CompliWord = [];
  }

  filterOpen(filterBox) {
    this.filterBox = !filterBox;
  }

  // 隨打即找
  searchStringChange(event: any, filterType) {
    if (this.WaittingAutoCompleteTimeout) {
      return;
    }
    this.WaittingAutoCompleteTimeout = true;
    setTimeout(() => {
      this.CompliWord = [];
      if (this.AutoCompliWord[filterType].length > 0) {
        // 打字中...
        this.searchString = event.target.value;
        this.AutoCompliWord[filterType].forEach(element => {
          element['filterText'].forEach(str => {
            if (
              str.toUpperCase().indexOf(this.searchString.toUpperCase()) >= 0
            ) {
              this.CompliWord.push(str);
            }
          });
        });
      }
      for (let i = 0; i < this.CompliWord.length; i++) {
        this.CompliWord[i] = this.CompliWord[i].replace(
          this.searchString,
          `<span style="color: red;">${this.searchString}</span>`
        );
      }
      // 彥人: 照A-Z排序
      this.CompliWord = this.CompliWord.sort((n1, n2) => {
        if (n1 > n2) {
          return 1;
        }

        if (n1 < n2) {
          return -1;
        }

        return 0;
      });
      this.WaittingAutoCompleteTimeout = false;
    }, 1000);
  }
  searchSelectOpen(searchSelect) {
    setTimeout(() => {
      this.searchSelect = searchSelect;
    }, 500);
  }
  searchRe(word: string) {
    word = word.replace('<span style="color: red;">', '');
    word = word.replace('</span>', '');
    this.searchString = word;
    return word;
  }

  encodeParameter(keyword: string) {
    return encodeURIComponent(keyword);
  }
}
