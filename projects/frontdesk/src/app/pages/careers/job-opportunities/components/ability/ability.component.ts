import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { PageMetaService, AuthHttpService, AuthService, VvtkService, AccountService } from '@frontdesk/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Resume } from '../../resume';

@Component({
  selector: 'vvtk-ability',
  templateUrl: './ability.component.html',
  styleUrls: ['./ability.component.scss']
})
export class AbilityComponent implements OnInit {
  routeParamsSub$: Subscription;
  vacancyId: number;
  form: FormGroup;
  resumeData: Resume = {
    forehead: null,
    resume: null,
    competencyTable: null,
    questionnaire: null
  };
  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountSrv: AccountService,
    private vvtkService: VvtkService,
    private authService: AuthService,
    private authHttpService: AuthHttpService,
    private pageMetaService: PageMetaService
  ) {
    this.initForm();
  }
  ngOnInit() {
    const sub$ = this.authService
      .checkLogin()
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
        })
      )
      .subscribe(isLogin => {
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
            if (isLogin) {
              this.loadResume();
              this.patchPer30Sec();
            } else {
              this.router.navigate([this.pageMetaService.getCustomPath(`/careers/job-opportunities/${this.vacancyId}`)]);
            }
          });
      });
  }

  //#region Init Form
  initForm() {
    this.form = this.formBuilder.group({
      teamWork: this.initCompetencyTable(),
      learning: this.initCompetencyTable(),
      analysisAndResolution: this.initCompetencyTable(),
      active: this.initCompetencyTable()
    });
  }

  initCompetencyTable() {
    return this.formBuilder.group({
      situation: ['', Validators.required],
      action: ['', Validators.required],
      result: ['', Validators.required]
    });
  }
  //#endregion

  //#region Init Resume
  loadResume() {
    const sub$ = this.authHttpService
      .get('api/Careers/Resume/Temporary')
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
        })
      )
      .subscribe(resp => {
        if (resp.ok) {
          this.resumeData = resp.json();
          if (!this.resumeData) {
            this.resumeData = new Resume();
          }
          this.loadForm();
        }
      });
  }

  loadForm() {
    const competencyTable = this.resumeData.competencyTable;
    Object.keys(competencyTable).forEach(prop => {
      if (this.form.controls.hasOwnProperty(prop)) {
        this.form.controls[prop].patchValue(competencyTable[prop]);
        this.form.controls[prop].markAsTouched();
      }
    });
    this.form.updateValueAndValidity();
  }
  //#endregion

  prev($event) {
    this.router.navigate([this.pageMetaService.getCustomPath(`/careers/job-opportunities/resume-tw/${this.vacancyId}`)]);
  }

  onSubmit() {
    this.resumeData.competencyTable = this.form.value;
    const sub$ = this.authHttpService
      .patch('api/Careers/Resume/Temporary', this.resumeData)
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
          this.router.navigate([this.pageMetaService.getCustomPath(`/careers-dice/${this.vacancyId}`)]);
        })
      )
      .subscribe();
  }

  isInvalid(field: string) {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }

  patchPer30Sec() {
    setInterval(() => {
      this.patchResume();
    }, 30000);
  }

  //#region Patch Resume
  patchResume(finallyCallback: () => void = null) {
    this.resumeData.competencyTable = this.form.value;
    const sub$ = this.authHttpService
      .patch('api/Careers/Resume/Temporary', this.resumeData)
      .pipe(
        finalize(() => {
          sub$.unsubscribe();
          (finallyCallback || function () { })();
        })
      )
      .subscribe();
  }
  //#endregion
}
