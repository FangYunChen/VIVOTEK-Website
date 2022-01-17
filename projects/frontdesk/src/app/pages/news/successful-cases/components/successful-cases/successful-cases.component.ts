import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { CardsItemsNewsReleases } from '../../../../../vvtk-core/classes';
import { VvtkService, I18nService } from '../../../../../vvtk-core/services';

@Component({
  selector: 'vvtk-successful-cases',
  templateUrl: './successful-cases.component.html',
  styleUrls: ['./successful-cases.component.scss']
})
export class SuccessfulCasesComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  lastHight = 0;
  isLoading = false;
  searchSelect = false;
  _cardsItems: CardsItemsNewsReleases[] = [];

  bannerCount = 3;
  _bannerItem: CardsItemsNewsReleases[] = [];

  searchBy = 'category'; // 第一個為category
  searchString = '';

  AutoCompliWord: {
    category: { lang: string; filterText: string[] }[];
    country: { lang: string; filterText: string[] }[];
    model: { lang: string; filterText: string[] }[];
    all: { lang: string; filterText: string[] }[];
  } = { category: [], country: [], model: [], all: [] };
  CompliWord = [];
  WaittingAutoCompleteTimeout = false;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private datepipe: DatePipe,
    public i18nService: I18nService
  ) {}

  ngOnInit() {
    if (this.isBrowser) {
      this.vvtkService.get(
        {
          path: 'api/Cases/List',
          disableLanguage: false,
          query: `data.sort=desc&data.limit=3&data.order=publishAt`
        },
        {
          next: resp => {
            if (resp.ok) {
              const data: {
                filterTotal: number;
                list: CardsItemsNewsReleases[];
              } = resp.json();
              if (data.filterTotal > 0) {
                this._bannerItem = data.list;
                if (this._bannerItem.length !== 0) {
                  this._bannerItem.forEach(ele => {
                    ele.publishAt = new Date(ele.publishAt);
                    ele.date = this.datepipe.transform(ele.publishAt, 'yMMMd');
                  });
                }

                // 讀取置頂以外的資料
                this.setCardsItems(12, false, this.searchBy, this.searchString);
              }

              document.body.onscroll = $event => {
                if (
                  $('.container').offset().top + $('.container').height() <
                  $(document).height() + 10
                ) {
                  if (
                    !this.isLoading &&
                    this.lastHight !== $('.container').height()
                  ) {
                    this.lastHight = $('.container').height();
                    this.setCardsItems(
                      12,
                      false,
                      this.searchBy,
                      this.searchString
                    );
                  }
                }
              };
            }
          }
        }
      );
      for (const key in this.AutoCompliWord) {
        if (this.AutoCompliWord.hasOwnProperty(key)) {
          this.setAutoCompliWord(key);
        }
      }
    }
  }

  setAutoCompliWord(filterType: string) {
    this.vvtkService.get(
      {
        path: 'api/Cases/FilterText',
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

  setCardsItems(
    dataLimit: number = 12,
    passLoading = false,
    searchBy: string = this.searchBy,
    searchString: string = this.searchString
  ) {
    if (!passLoading && this.isLoading) {
      return;
    }
    if (!passLoading) {
      this.isLoading = true;
    }
    let nowLimit = 0;
    if (searchString === '') {
      nowLimit += this._bannerItem.length;
    }
    nowLimit += this._cardsItems.length;

    this.vvtkService.get(
      {
        path: 'api/Cases/List',
        disableLanguage: false,
        // tslint:disable-next-line:max-line-length
        query: `data.sort=desc&data.limit=${dataLimit}&data.order=publishAt&data.start=${nowLimit}&data.searchBy=${searchBy}&data.filterText=${searchString}`
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: {
              filterTotal: number;
              list: CardsItemsNewsReleases[];
            } = resp.json();
            if (data.filterTotal > 0) {
              const items = data.list;
              items.forEach(ele => {
                ele.publishAt = new Date(ele.publishAt);
                this._cardsItems.push(ele);
              });
            }
            this.isLoading = false;
          }
        }
      }
    );
  }

  // 隨打即找
  searchStringChange(event: any, searchBy) {
    if (this.WaittingAutoCompleteTimeout) {
      return;
    }
    this.WaittingAutoCompleteTimeout = true;
    setTimeout(() => {
      this.CompliWord = [];
      if (this.AutoCompliWord[searchBy].length > 0) {
        // 打字中...
        this.searchString = event.target.value;
        this.AutoCompliWord[searchBy].forEach(element => {
          element['filterText'].forEach(str => {
            if (
              str.toUpperCase().indexOf(this.searchString.toUpperCase()) >= 0
            ) {
              this.CompliWord.push(str);
            }
          });
        });
      }
      this.CompliWord = this.CompliWord.filter(
        (word, index, self) => self.indexOf(word) === index
      );
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
      this.goSearch(this.searchString);
      this.WaittingAutoCompleteTimeout = false;
    }, 1000);
  }
  goSearch(searchString) {
    this.searchString = searchString;

    if (this._cardsItems.length === 0) {
      this.setCardsItems(12, true, this.searchBy, searchString);
    } else {
      this._cardsItems = [];
    }
  }
  changeSearchBy(searchBy, searchString: string) {
    this.searchBy = searchBy;
    this.CompliWord = [];
    this.goSearch(searchString);
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
    this.goSearch(word);
    return word;
  }
}
