import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SortablejsOptions } from 'angular-sortablejs';
import { Subscription } from 'rxjs';
import { BuyTag } from '../../../vvtk-core/classes/buyTag';
import { BuyWhere } from '../../../vvtk-core/classes/buyWhere';
import { Continent, Country, States } from '../../../vvtk-core/classes/continent';
import { SharedService } from '../../../vvtk-core/services/shared.service';
import { ToolsService } from '../../../vvtk-core/services/tools.service';
import { VvtkService } from '../../../vvtk-core/services/vvtk.service';
import { VvtkApiService } from '../../../vvtk-core/services/vvtk-api.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'vvtk-buy-where-content',
  templateUrl: './buy-where-content.component.html',
  styleUrls: ['./buy-where-content.component.scss']
})
export class BuyWhereContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  id: number;
  buyWhere: BuyWhere;
  tags: BuyTag[] = [];
  continents: Continent[] = [];
  countries: Country[] = [];
  states: States[] = [];

  isLoading = false;

  // 如果要改用buyWhere物件的ngModel要加trackBy的function才能處理字串陣列，但在這裡因為拖拉功能所以要這樣寫才能運作。
  phone: { value: string }[];
  fax: { value: string }[];
  email: { value: string }[];

  constructor(
    private route: ActivatedRoute,
    private vvtkApiService: VvtkApiService,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.buyWhere = {
      sequence: 0,
      continent: null,
      country: null,
      title: '',
      states: null,
      address: '',
      addressUrl: '',
      logo: {
        src: '',
        alt: '',
        title: ''
      },
      phone: ['123'],
      fax: [],
      web: [],
      email: [],
      tag: 0
    };
    this.phone = [];
    this.fax = [];
    this.email = [];
    this.continents = [];
    this.countries = [];
    this.states = [];
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    this.getContinents();
    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getContinents() {
    this.vvtkService.get(
      {
        path: 'api/Continents/Real',
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.continents = body;
        }
      }
    );
  }

  getCountries() {
    const id = this.buyWhere.continent;
    this.vvtkService.get(
      {
        path: `api/Continents/${id}/Countries`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.countries = body;
          const selected = this.countries.filter(item => {
            return item.id === this.buyWhere.country;
          });
          if (selected.length === 0) {
            this.buyWhere.country = null;
            this.buyWhere.states = null;
            this.states = [];
          }
        }
      }
    );
  }

  getStates() {
    const id = this.buyWhere.country;
    this.vvtkService.get(
      {
        path: `api/Countries/${id}/States`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          this.states = body;
          const selected = this.states.filter(item => {
            return item.id === this.buyWhere.states;
          });
          if (selected.length === 0) {
            this.buyWhere.states = null;
          }
        }
      }
    );
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.getTags();
        if (this.id > 0) {
          this.getBuyWhere();
        }
      }
    );
  }

  getTags() {
    const lang = this.id === 0 ? 'global' : null;

    this.vvtkService.get(
      {
        path: `api/Buy/Tags`,
        language: lang
      },
      {
        next: resp => {
          const body = resp.json();
          this.tags = body;
        }
      }
    );
  }

  getBuyWhere() {
    this.vvtkService.get(
      { path: `api/Buy/Where/${this.id}` },
      {
        next: resp => {
          const body = resp.json();
          body.tag = body.tag ? body.tag.id : 0;
          this.buyWhere = body;
          this.getCountries();
          this.getStates();
          this.phone = this.buyWhere.phone.map(x => ({ value: x }));
          this.fax = this.buyWhere.fax.map(x => ({ value: x }));
          this.email = this.buyWhere.email.map(x => ({ value: x }));
        }
      }
    );
  }

  getTagName(id: number) {
    const find = this.tags.find(item => {
      return item.id === id;
    });
    return find ? find.name : '';
  }

  getContinentName(id: number) {
    const find = this.continents.find(item => {
      return item.id === id;
    });
    return find ? find.name : '';
  }

  getCountryName(id: number) {
    const find = this.countries.find(item => {
      return item.id === id;
    });
    return find ? find.name : '';
  }

  getStateName(id: number) {
    const find = this.states.find(item => {
      return item.id === id;
    });
    return find ? find.name : '';
  }

  save() {
    this.isLoading = true;
    this.buyWhere.phone = this.phone.map(x => x.value);
    this.buyWhere.fax = this.fax.map(x => x.value);
    this.buyWhere.email = this.email.map(x => x.value);

    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Buy/Where`,
          language: 'global'
        },
        this.buyWhere,
        {
          next: resp => {
            this.router.navigate(['/buy/where/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Buy/Where/${this.id}`
        },
        this.buyWhere,
        {
          next: resp => {
            this.router.navigate(['/buy/where/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  imgFileSelect($event) {
    const file: File = $event.target.files[0];
    this.buyWhere.logo.title = file.name;
    this.buyWhere.logo.alt = file.name;
    this.isLoading = true;

    this.vvtkApiService.uploadFile(file, `Buy/Where/${file.name}`)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          $event.target.value = null;
        })
      )
      .subscribe(
        x => this.buyWhere.logo.src = x.link
      );
  }

  typeof(obj) {
    return typeof obj;
  }

  addPhone(idx: number) {
    if (this.phone.length >= 3) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.phone);
    clone.splice(idx, 0, { value: '' });
    this.phone = clone;
  }

  deletePhone(idx: number) {
    this.phone.splice(idx, 1);
    this.phone = this.toolsService.copyObject(this.phone);
  }

  addFax(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.fax);
    clone.splice(idx, 0, { value: '' });
    this.fax = clone;
  }

  deleteFax(idx: number) {
    this.fax.splice(idx, 1);
    this.fax = this.toolsService.copyObject(this.fax);
  }

  addWeb(idx: number) {
    if (this.buyWhere.web.length >= 5) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.buyWhere.web);
    clone.splice(idx, 0, { url: '', urlName: '' });
    this.buyWhere.web = clone;
  }

  deleteWeb(idx: number) {
    this.buyWhere.web.splice(idx, 1);
    this.buyWhere.web = this.toolsService.copyObject(this.buyWhere.web);
  }

  addEmail(idx: number) {
    if (this.email.length >= 3) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.email);
    clone.splice(idx, 0, { value: '' });
    this.email = clone;
  }

  deleteEmail(idx: number) {
    this.email.splice(idx, 1);
    this.email = this.toolsService.copyObject(this.email);
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
