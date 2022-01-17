import { Component, OnInit } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AccountService,
  AuthService,
  AuthHttpService,
  VvtkService,
  PageMetaService
} from '@frontdesk/core/services';
import { Collection } from '@frontdesk/core/collection.enum';
import { Subscription, of } from 'rxjs';
import { Resume } from '../../../job-opportunities/resume';

@Component({
  selector: 'vvtk-job-opportunities-page',
  templateUrl: './job-opportunities-page.component.html',
  styleUrls: ['./job-opportunities-page.component.scss']
})
export class JobOpportunitiesPageComponent implements OnInit {
  routeParamsSub$: Subscription;

  applyMask = false;

  vacancyId: number;
  vacancyData: any = {};
  title: string = null;
  foreheadRe = true;
  foreheadText = null;
  resumeData: Resume = {
    forehead: null,
    resume: null,
    competencyTable: null,
    questionnaire: null
  };

  isAtTaiwan: boolean = null;
  isUserTaiwanese: boolean = null;

  CountryList: { [id: number]: string } = [];
  Taiwan = '台灣';

  public collection = Collection;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private vvtkService: VvtkService,
    private pageMetaService: PageMetaService
  ) { }

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
        this.vacancyId = params['id'] || this.route.snapshot.data['id'];
        this.loadVacancy();
        this.loadCountryList();
      });
  }

  loadVacancy() {
    this.vvtkService.get(
      {
        path: `api/Careers/Vacancy/${this.vacancyId}`,
        disableLanguage: false
      },
      {
        next: resp => {
          this.vacancyData = resp.json();
          if (this.vacancyData === null) {
            this.router.navigate([this.pageMetaService.getCustomPath('/404')]);
          }
          this.vacancyData.description = (this.vacancyData
            .description as string).replace(/(?:\r\n|\r|\n)/g, '<br />');
          this.vacancyData.responsibilities = (this.vacancyData
            .responsibilities as string).replace(/(?:\r\n|\r|\n)/g, '<br />');
          this.vacancyData.requirements = (this.vacancyData
            .requirements as string).replace(/(?:\r\n|\r|\n)/g, '<br />');

          this.isAtTaiwan = this.vacancyData.country.name === this.Taiwan;
        }
      }
    );
  }

  loadCountryList() {
    this.vvtkService.get(
      {
        path: 'api/Countries/Real',
        disableLanguage: true
      },
      {
        next: resp => {
          if (resp.ok) {
            const data: any[] = resp.json();
            if (data && data.length > 0) {
              data.forEach(country => {
                if (!this.CountryList[country.id]) {
                  this.CountryList[country.id] = country.name;
                }
              });
            }
          }
        }
      }
    );
  }

  loadUserCountry() {
    const account$ = this.accountService
      .getMyAccountData()
      .pipe(
        finalize(() => {
          account$.unsubscribe();
        })
      )
      .subscribe(accountResp => {
        if (accountResp.ok) {
          const accountData = accountResp.json();
          this.isUserTaiwanese =
            this.CountryList[accountData.countryId] === this.Taiwan;
        }
      });
  }

  applyVacancy(event) {
    const auth$ = this.authService
      .checkLogin()
      .pipe(
        finalize(() => {
          auth$.unsubscribe();
        })
      )
      .subscribe(isLogin => {
        if (isLogin) {
          const account$ = this.accountService
            .getMyAccountData()
            .pipe(
              finalize(() => {
                account$.unsubscribe();
              })
            )
            .subscribe(accountResp => {
              if (accountResp.ok) {
                const accountData = accountResp.json();
                this.isUserTaiwanese =
                  this.CountryList[accountData.countryId] === this.Taiwan;
                if (this.isAtTaiwan && this.isUserTaiwanese) {
                  this.applyMask = true;
                } else {
                  this.toEnResume();
                }
              }
            });
        } else {
          this.vvtkService.alertUserLogin(true);
        }
      });
  }

  applyWindow($event) {
    this.applyMask = false;
  }

  foreheadDes(foreheadRe) {
    if (foreheadRe) {
      this.foreheadText = '';
    } else {
      this.foreheadText = this.foreheadText;
    }
    this.foreheadRe = foreheadRe;
  }

  toTwResume($event) {
    this.resumeData.forehead = this.foreheadText;
    const sub$ = this.authHttpService
      .patch('api/Careers/Resume/Temporary', this.resumeData)
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
          this.router.navigate([
            this.pageMetaService.getCustomPath(
              `/careers/job-opportunities/resume-tw/${this.vacancyId}`
            )
          ]);
        })
      )
      .subscribe();
  }

  toEnResume() {
    this.router.navigate([
      this.pageMetaService.getCustomPath(
        `/careers/job-opportunities/resume-en/${this.vacancyId}`
      )
    ]);
  }
}
