import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { VvtkService } from '@frontdesk/core/services';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-where-to-buy-page',
  templateUrl: './where-to-buy-page.component.html',
  styleUrls: ['./where-to-buy-page.component.scss']
})
export class WhereToBuyPageComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  // tslint:disable-next-line:max-line-length
  addUrl = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.870693006648!2d100.60130341483158!3d13.846799390286083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29d4265ff76a5%3A0xd6e2c87dc756633f!2z4LiW4LiZ4LiZIOC4peC4suC4lOC4m-C4peC4suC5gOC4hOC5ieC4siBLaHdhZW5nIENob3Jha2hlIEJ1YSwgS2hldCBMYXQgUGhyYW8sIEtydW5nIFRoZXAgTWFoYSBOYWtob24gMTAyMzDms7DlnIs!5e0!3m2!1szh-TW!2stw!4v1511946719646" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>';
  hardcode_card = {
    name: '',
    companies: [
      {
        // hardcode用來區別要不要顯示hardcode好的那個購買地點介紹，後端API是不會管到這個欄位的
        hardcode: 1,
        id: 0,
        title: 'VIVOTEK USA',
        image: {
          src:
            '//blob.vivotek.com/downloadfile/Buy/Where/1.VIVOTEK_Delta_lock-up_Logo_RGB_blue_white.png',
          alt: 'vivotek',
          title: 'vivotek'
        },
        phone: [],
        fax: [],
        web: [],
        email: [],
        tag: {},
        address: '',
        addressUrl: ''
      }
    ]
  };
  hardcode_card2 = {
    name: '',
    companies: [
      {
        // hardcode用來區別要不要顯示hardcode好的那個購買地點介紹，後端API是不會管到這個欄位的
        hardcode: 2,
        id: 0,
        title: 'VIVOTEK USA',
        image: {
          src:
            '//blob.vivotek.com/downloadfile/Buy/Where/1.VIVOTEK_Delta_lock-up_Logo_RGB_blue_white.png',
          alt: 'vivotek',
          title: 'vivotek'
        },
        phone: [],
        fax: [],
        web: [],
        email: [],
        tag: {},
        address: '',
        addressUrl: ''
      }
    ]
  };
  cardMask = false;
  usaMask = false;
  canadaMask = false;
  mapMask = false;
  mapUrl: SafeResourceUrl;
  mapTemp = '';
  openEx = 0;
  openItem;
  routeParamsSub$: Subscription;
  id: any;
  filter: any;
  cardsItems = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.routeParamsSub$ = this.route.params
      .pipe(
        catchError(error => {
          console.error('An error occurred', error);
          return of(error);
        }),
        finalize(() => {
          this.routeParamsSub$.unsubscribe();
        })
      )
      .subscribe(params => {
        this.id = params['id'] || this.route.snapshot.data['id'];
        this.filter = params['filter'] || this.route.snapshot.data['filter'];
      });
    this.setCardsItems();
  }

  setCardsItems() {
    if (this.id === 'USA') {
      this.cardsItems.push({ country: 'USA', states: [this.hardcode_card] });
      console.log(this.id);
    } else {
      // 當this.filter有東西時，this.id會是filter type (title or tagname)
      let filterString = `data.${this.id}=${this.filter}`;
      if (!this.filter) {
        filterString = `data.country=${this.id}`;
      }
      this.vvtkService.get(
        {
          path: 'api/Buy/Where',
          disableLanguage: false,
          query: filterString
        },
        {
          next: resp => {
            if (resp.ok) {
              const responseData = resp.json();
              if (responseData && responseData.length > 0) {
                responseData.forEach(element => {
                  // 資料結構不一樣，做mapping (資料有洲別，可是顯示沒有，所以改成國家為第一層)
                  element.countries.forEach(ele => {
                    if (ele.country === 'United States') {
                      ele.states.unshift(this.hardcode_card);
                    } else if(ele.country === 'Canada'){
                      ele.states.unshift(this.hardcode_card2);
                    }
                    this.cardsItems.push(ele);
                  });
                });
              } else {
                if (
                  filterString.indexOf('usa') > 0 ||
                  filterString.indexOf('USA') > 0
                ) {
                  this.cardsItems.push({ states: [this.hardcode_card] });
                }
              }

              if (this.isBrowser) {
                setTimeout(() => {
                  $('.cardHide').each(function() {
                    let i = 0;
                    const $this = $(this);
                    const limitW = $this.width() - 20;
                    $this.find('p').each(function() {
                      if ($(this).outerWidth() >= limitW) {
                        i++;
                      }
                    });
                    if (i > 0) {
                      $this.find('.ex').addClass('show');
                    }
                  });
                }, 1);
              }
            }
          },
          error: error => {
            console.error('An error occurred in getWhereBuy', error);
            // TODO: 要做 跳到 找不到這個頁面 之後跳回第一頁新聞列表的功能
          }
        }
      );
    }
  }

  openCard(openItem, cardMask) {
    this.cardMask = true;
    this.openItem = openItem;
  }
  usaOpen($event) {
    this.usaMask = true;
  }
  canadaOpen($event){
    this.canadaMask = true;
  }
  mapOpen(url) {
    this.mapTemp = url.split(' ');
    if (this.mapTemp.length > 1) {
      this.mapMask = true;
      this.cardMask = false;
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.mapTemp[1].slice(5, this.mapTemp[1].length - 1)
      );
    }
  }

  mapPopup($event) {
    this.mapMask = $event;
  }
  cardPopup($event) {
    this.cardMask = $event;
  }
  usaPopup($event) {
    this.usaMask = $event;
  }
  canadaPopup($event) {
    this.canadaMask = $event;
  }
}
