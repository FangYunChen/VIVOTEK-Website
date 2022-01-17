import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { VvtkService, AccountService } from '@frontdesk/core/services';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'vvtk-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  form: FormGroup;
  showAllRequired = false;
  loadingShow = false;
  doSuccess = false;
  doFail = false;
  // openPopup = false;
  usaMask = false;
  mapUrl: SafeResourceUrl;
  mapTemp = '';
  mapMask = false;
  cardMask = false;
  openEx = 0;
  openItem;
  countryName = '';

  _Subjects = [];
  _Countries = [];

  _Office: {
    vivotekInc: {
      title: string;
      name: string;
      address: string;
      phone: string;
      email: string;
      fax: string;
      map: string;
    };
    technicalCenter: {
      title: string;
      name: string;
      address: string;
      phone: string;
      email: string;
      fax: string;
      map: string;
    };
  } = {
    vivotekInc: {
      title: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      fax: '',
      map: ''
    },
    technicalCenter: {
      title: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      fax: '',
      map: ''
    }
  };
  _GlobalOffices: any[] = [];

  selectedSubjects = -1;

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private vvtkService: VvtkService,
    private formBuilder: FormBuilder,
    private accountSrv: AccountService,
    private sanitizer: DomSanitizer
  ) {
    // this.initForm();
  }

  ngOnInit() {
    this.vvtkService.get(
      {
        path: 'api/Office/Headquarters',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: any = resp.json();
            if (data) {
              this._Office = data;
            }
          }
        }
      }
    );

    this.vvtkService.get(
      {
        path: 'api/Office/Branch/List',
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: any[] = resp.json();
            if (data && data.length > 0) {
              data.forEach(branchItem => {
                let find = this._GlobalOffices.find(dataItem => {
                  return dataItem.list.find(
                    office => branchItem.country.id === office.country.id
                  );
                });
                if (!find) {
                  find = {
                    countryName: branchItem.country.name,
                    countryDisplayOrder: branchItem.country.displayOrder,
                    list: []
                  };
                  this._GlobalOffices.push(find);
                }
                find.list.push(branchItem);
              });

              this._GlobalOffices.sort((a, b) => {
                return a.countryDisplayOrder < b.countryDisplayOrder ? 1 : -1;
              });
              this._GlobalOffices.forEach(branch => {
                branch.list.sort((a, b) => {
                  return a.displayOrder < b.displayOrder ? 1 : -1;
                });
              });
              // phone = input.Phones;
              // email = input.Email;
              // fax = input.Faxs;

              // if (this.isBrowser) {
              //   setTimeout(() => {
              //     $('.cardHide').each(function () {
              //       let i = 0;
              //       const $this = $(this);
              //       const limitW = $this.width() - 20;
              //       $this.find('p').each(function () {
              //         if ($(this).outerWidth() >= limitW) {
              //           i++;
              //         }
              //       });
              //       if (i > 0) {
              //         $this.find('.ex').addClass('show');
              //       }
              //     });
              //   }, 1);
              // }
            }
          }
        }
      }
    );

    this.vvtkService.getContact('Subjects', resp => {
      this._Subjects = resp.json() ? resp.json() : this._Subjects;
    });
    this.vvtkService.get(
      {
        path: 'api/Countries/Real',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            this._Countries = resp.json() ? resp.json() : this._Countries;
          }
        }
      }
    );
  }

  changeSubjects(Subjects) {
    this.selectedSubjects = Subjects;
  }

  // initForm() {
  //   this.form = this.formBuilder.group({
  //     subject: ['', Validators.required],
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     email: [
  //       '',
  //       null,
  //       Validators.composeAsync([
  //         (ctrl: AbstractControl) => Promise.resolve(Validators.required(ctrl)),
  //         (ctrl: AbstractControl) =>
  //           Promise.resolve(
  //             Validators.pattern(this.accountSrv.usernameRegexPattern)(ctrl)
  //           )
  //       ])
  //     ],
  //     company: ['', Validators.required],
  //     phone: ['', Validators.required],
  //     country: ['', Validators.required],
  //     comment: ['', Validators.required]
  //   });
  // }

  // SendSuggest() {
  //   if (!this.form.valid) {
  //     this.showAllRequired = true;
  //   } else {
  //     this.loadingShow = true;
  //     const sub$ = this.vvtkService
  //       .postContact(this.form.value)
  //       .pipe(
  //         catchError(error => {
  //           this.loadingShow = false;
  //           console.error('An error occurred in postContact', error);
  //           console.error('Error : ' + error.json());
  //           return of(error);
  //         }),
  //         finalize(() => {
  //           this.loadingShow = false;
  //           sub$.unsubscribe();
  //         })
  //       )
  //       .subscribe(resp => {
  //         this.openPopup = true;
  //         if (resp.ok) {
  //           this.loadingShow = false;
  //           this.doSuccess = true;
  //           this.doFail = false;
  //           this.initForm();
  //         } else {
  //           this.doFail = true;
  //         }
  //       });
  //   }
  // }

  // windowPopup($event) {
  //   this.openPopup = $event;
  // }

  mapPopup($event) {
    this.mapMask = $event;
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

  openCard(openItem, cardMask, countryName) {
    this.cardMask = true;
    this.openItem = openItem;
    this.countryName = countryName;
  }

  cardPopup($event) {
    this.cardMask = $event;
    this.countryName = '';
  }
}
