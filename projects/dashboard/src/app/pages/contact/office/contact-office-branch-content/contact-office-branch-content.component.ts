import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactOfficeBranch } from '../../../../vvtk-core/classes/contactOffice';
import { Country } from '../../../../vvtk-core/classes/continent';
import { ToolsService } from '../../../../vvtk-core/services/tools.service';
import { SharedService } from '../../../../vvtk-core/services/shared.service';
import { VvtkService } from '../../../../vvtk-core/services/vvtk.service';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'vvtk-contact-office-branch-content',
  templateUrl: './contact-office-branch-content.component.html',
  styleUrls: ['./contact-office-branch-content.component.scss']
})
export class ContactOfficeBranchContentComponent implements OnInit, OnDestroy {
  pageIsEditable: boolean;

  selectedLanguage$: Subscription;
  selectedLanguage: string;

  groupOptions: SortablejsOptions = {
    handle: '.drag-handle',
    animation: 300
  };

  id: number;
  data: ContactOfficeBranch;
  countries: Country[] = [];
  isLoading = false;

  // 如果要改用buyWhere物件的ngModel要加trackBy的function才能處理字串陣列，但在這裡因為拖拉功能所以要這樣寫才能運作。
  phones: { value: string }[] = [];
  faxes: { value: string }[] = [];
  emails: { value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private vvtkService: VvtkService,
    private sharedService: SharedService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    this.data = {
      country: {
        id: null
      },
      title: '',
      name: '',
      address: '',
      contentText: '',
      phones: [],
      faxes: [],
      webs: [],
      emails: [],
      map: ''
    };
  }

  ngOnInit() {
    this.pageIsEditable = this.sharedService.pageIsEditable;

    const routeParams$ = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getSelectedLanguage();
      this.getCountries();
      setTimeout(() => {
        routeParams$.unsubscribe();
      }, 1);
    });
  }

  getCountries() {
    this.vvtkService.get(
      {
        path: `api/Countries/Real`,
        disableLanguage: true
      },
      {
        next: resp => {
          const body = resp.json();
          body.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });
          this.countries = body;
        }
      }
    );
  }

  getSelectedLanguage() {
    this.selectedLanguage$ = this.sharedService.selectedLanguage$.subscribe(
      selectedLanguage => {
        this.selectedLanguage = selectedLanguage;
        if (this.id > 0) {
          this.getData();
        }
      }
    );
  }

  getData() {
    this.vvtkService.get(
      {
        path: `api/Office/Branch/${this.id}`
      },
      {
        next: resp => {
          const body = resp.json();
          this.data = body;

          this.phones = this.data.phones.map(x => ({ value: x }));
          this.faxes = this.data.faxes.map(x => ({ value: x }));
          this.emails = this.data.emails.map(x => ({ value: x }));
        }
      }
    );
  }

  getCountryName(id: number) {
    const find = this.countries.find(country => {
      return country.id === id;
    });
    return find ? find.name : '';
  }

  addPhone(idx: number) {
    if (this.phones.length >= 3) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.phones);
    clone.splice(idx, 0, { value: '' });
    this.phones = clone;
  }

  deletePhone(idx: number) {
    this.phones.splice(idx, 1);
    this.phones = this.toolsService.copyObject(this.phones);
  }

  addFax(idx: number) {
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.faxes);
    clone.splice(idx, 0, { value: '' });
    this.faxes = clone;
  }

  deleteFax(idx: number) {
    this.faxes.splice(idx, 1);
    this.faxes = this.toolsService.copyObject(this.faxes);
  }

  addWeb(idx: number) {
    if (this.data.webs.length >= 5) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.data.webs);
    clone.splice(idx, 0, { url: '', urlName: '' });
    this.data.webs = clone;
  }

  deleteWeb(idx: number) {
    this.data.webs.splice(idx, 1);
    this.data.webs = this.toolsService.copyObject(this.data.webs);
  }

  addEmail(idx: number) {
    if (this.emails.length >= 3) {
      return;
    }
    this.toolsService.lockScrollTop();

    const clone = this.toolsService.copyObject(this.emails);
    clone.splice(idx, 0, { value: '' });
    this.emails = clone;
  }

  deleteEmail(idx: number) {
    this.emails.splice(idx, 1);
    this.emails = this.toolsService.copyObject(this.emails);
  }

  save() {
    this.isLoading = true;
    this.data.phones = this.phones.map(x => x.value);
    this.data.faxes = this.faxes.map(x => x.value);
    this.data.emails = this.emails.map(x => x.value);
    if (this.id === 0) {
      this.vvtkService.post(
        {
          path: `api/Office/Branch`,
          language: 'global'
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/contact/offices/branch/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    } else {
      this.vvtkService.patch(
        {
          path: `api/Office/Branch/${this.id}`
        },
        this.data,
        {
          next: resp => {
            this.router.navigate(['/contact/offices/branch/list']);
          },
          finally: () => {
            this.isLoading = false;
          }
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.selectedLanguage$) {
      this.selectedLanguage$.unsubscribe();
    }
  }
}
