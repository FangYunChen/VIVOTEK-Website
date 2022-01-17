import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import {
  FormArray,
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import {
  AccountService,
  VvtkService,
  AuthHttpService,
  AuthService,
  PageMetaService
} from '@frontdesk/core/services';
import { Resume } from '../../resume';

@Component({
  selector: 'vvtk-resume-tw',
  templateUrl: './resume-tw.component.html',
  styleUrls: ['./resume-tw.component.scss']
})
export class ResumeTwComponent implements OnInit {
  isBrowser: boolean = isPlatformBrowser(this.platform_id);
  limitSize = 20 * 1024; // 20MB
  uploadPath = 'aboutus/careers';
  eduActive = 'edu0';
  empActive = 'emp0';
  famActive = 'fam0';
  recActive = 'rec0';
  eduIndex = [0];
  empIndex = [0];
  famIndex = [0];
  recIndex = [0];
  eduDelHide = true;
  empDelHide = true;
  famDelHide = true;
  recDelHide = true;

  tempFiles: File[];

  isLoading = false;

  form: FormGroup;

  routeParamsSub$: Subscription;
  vacancyId: number;
  vacancyTitle: string;

  resumeData: Resume = {
    forehead: null,
    resume: null,
    competencyTable: null,
    questionnaire: null
  };

  imgcode = [];

  constructor(
    @Inject(PLATFORM_ID) private platform_id,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private accountSrv: AccountService,
    private vvtkService: VvtkService,
    private authHttpService: AuthHttpService,
    private authService: AuthService,
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
              this.router.navigate([
                this.pageMetaService.getCustomPath(
                  `/careers/job-opportunities/${this.vacancyId}`
                )
              ]);
            }
          });
      });
  }

  //#region Init Form
  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      sex: ['', Validators.required],
      birthday: ['', Validators.required],
      idNo: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      militaryService: ['', Validators.required],
      childrenNumber: ['', Validators.required],
      email: [
        '',
        null,
        Validators.composeAsync([
          (ctrl: AbstractControl) => Promise.resolve(Validators.required(ctrl)),
          (ctrl: AbstractControl) =>
            Promise.resolve(
              Validators.pattern(this.accountSrv.usernameRegexPattern)(ctrl)
            )
        ])
      ],
      cellphone: ['', Validators.required],
      permanentAddress: ['', Validators.required],
      permanentPhone: ['', Validators.required],
      presentAddress: ['', Validators.required],
      presentPhone: ['', Validators.required],
      education: this.formBuilder.array([this.initEducation()]),
      employmentRecord: this.formBuilder.array([this.initEmploymentRecord()]),
      familyInformation: this.formBuilder.array([this.initFamilyInformation()]),
      emergencyContact: this.formBuilder.group({
        name: ['', Validators.required],
        relation: ['', Validators.required],
        phone: ['', Validators.required]
      }),
      interests: ['', Validators.required],
      skills: ['', Validators.required],
      workExpectation: ['', Validators.required],
      futureAspiration: ['', Validators.required],
      strengthAndWeakness: ['', Validators.required],
      expectedSalary: ['', Validators.required],
      availabilityDate: ['', Validators.required],
      whereCatchVacancy: ['', Validators.required],
      reference: this.formBuilder.array([this.initReference()]),
      files: this.formBuilder.array([this.initFiles()]),
      note: ['']
    });
  }

  initEducation() {
    return this.formBuilder.group({
      schoolName: ['', Validators.required],
      major: ['', Validators.required],
      division: ['', Validators.required],
      degree: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      gradute: ['', Validators.required]
    });
  }

  initEmploymentRecord() {
    return this.formBuilder.group({
      companyName: ['', Validators.required],
      department: ['', Validators.required],
      title: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reasonForLeaving: ['', Validators.required],
      supervisor: this.formBuilder.group({
        name: ['', Validators.required],
        title: ['', Validators.required]
      })
    });
  }

  initFamilyInformation() {
    return this.formBuilder.group({
      relation: ['', Validators.required],
      name: ['', Validators.required],
      job: this.formBuilder.group({
        company: ['', Validators.required],
        title: ['', Validators.required]
      })
    });
  }

  initReference() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      title: ['', Validators.required],
      phone: ['', Validators.required],
      relation: ['', Validators.required]
    });
  }

  initFiles() {
    return this.formBuilder.group({
      name: [''],
      url: [''],
      size: [0]
    });
  }
  //#endregion

  //#region Init Resume
  loadResume() {
    this.vvtkService.get(
      {
        path: `api/Careers/Vacancy/${this.vacancyId}`,
        disableLanguage: false
      },
      {
        next: resp => {
          if (resp.ok) {
            const vacancy: any = resp.json();
            this.vacancyTitle = vacancy.title || '';
          }
        }
      }
    );
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
          this.resumeData.resume.education.forEach((edu, index) => {
            if (index <= this.resumeData.resume.education.length - 2) {
              this.addTabs('edu');
            }
          });
          this.resumeData.resume.employmentRecord.forEach((emp, index) => {
            if (index <= this.resumeData.resume.employmentRecord.length - 2) {
              this.addTabs('emp');
            }
          });
          this.resumeData.resume.familyInformation.forEach((fam, index) => {
            if (index <= this.resumeData.resume.familyInformation.length - 2) {
              this.addTabs('fam');
            }
          });
          this.resumeData.resume.reference.forEach((ref, index) => {
            if (index <= this.resumeData.resume.reference.length - 2) {
              this.addTabs('ref');
            }
          });
          this.resumeData.resume.files.forEach((file, index) => {
            if (index <= this.resumeData.resume.files.length - 2) {
              const ctrl = this.form.controls['files'] as FormArray;
              ctrl.push(this.initFiles());
            }
          });
          this.loadForm();
        }
      });
  }

  loadForm() {
    const resume = this.resumeData.resume;
    Object.keys(resume).forEach(prop => {
      if (this.form.controls.hasOwnProperty(prop)) {
        this.form.controls[prop].patchValue(resume[prop]);
        this.form.controls[prop].markAsTouched();
      }
    });
    this.form.updateValueAndValidity();
  }
  //#endregion

  //#region Web method
  imgFileSelect($event) {
    this.isLoading = true;
    this.tempFiles = [];
    this.resumeData.resume.files = [];
    for (let i = 0; i < $event.target.files.length; i++) {
      this.tempFiles.push($event.target.files[i]);
    }
    $event.target.value = null;

    this.imgUpload();
  }

  imgUpload() {
    if (this.tempFiles.length === 0) {
      this.isLoading = false;
      return;
    }

    const file: File = this.tempFiles.shift();

    const newFile: {
      name: string;
      url: string;
      size: number;
    } = {
      name: file.name,
      url: '',
      size: Math.ceil(file.size / 1024)
    };

    if (newFile.size > this.limitSize) {
      newFile.url = URL.createObjectURL(file);
      (this.form.controls.files as FormArray).push(
        this.formBuilder.group({
          name: [newFile.name],
          url: [newFile.url],
          size: [newFile.size]
        })
      );
      this.resumeData.resume.files.push(newFile);
      this.imgUpload();
    } else {
      const data = this.data2FormData({
        file: file,
        filename: `${this.uploadPath}/${file.name.replace(/\(|\)/g, '')}`
      });

      const upload$ = this.authHttpService
        .post('api/Upload', data)
        .pipe(
          finalize(() => {
            $('.file-box')
              .find('.preview')
              .html();
            this.imgUpload();
          })
        )
        .subscribe(resp => {
          const body = resp.json();
          newFile.url = body.link;
          (this.form.controls.files as FormArray).push(
            this.formBuilder.group({
              name: [newFile.name],
              url: [newFile.url]
            })
          );
          this.resumeData.resume.files.push(newFile);
        });
    }
  }

  data2FormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).map(function (key, index) {
      formData.append(key, data[key]);
    });
    return formData;
  }

  removeFile(index) {
    (this.form.controls.files as FormArray).removeAt(index);
  }

  patchPer30Sec() {
    setInterval(() => {
      this.patchResume();
    }, 30000);
  }

  isInvalid(field: string) {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }

  tabsOpen(tabs, tabsActive) {
    if (tabs === 'edu') {
      this.eduActive = tabsActive;
    } else if (tabs === 'emp') {
      this.empActive = tabsActive;
    } else if (tabs === 'fam') {
      this.famActive = tabsActive;
    } else if (tabs === 'rec') {
      this.recActive = tabsActive;
    }
  }

  addTabs(tabs) {
    if (tabs === 'edu') {
      this.eduDelHide = false;
      const eduLen = this.eduIndex.length;
      const eduNum = this.eduIndex[eduLen - 1] + 1;
      this.eduIndex.splice(eduLen, 0, eduNum);
      this.eduActive = 'edu' + eduNum;
      const control = this.form.controls['education'] as FormArray;
      control.push(this.initEducation());
    } else if (tabs === 'emp') {
      this.empDelHide = false;
      const empLen = this.empIndex.length;
      const empNum = this.empIndex[empLen - 1] + 1;
      this.empIndex.splice(empLen, 0, empNum);
      this.empActive = 'emp' + empNum;
      const control = this.form.controls['employmentRecord'] as FormArray;
      control.push(this.initEmploymentRecord());
    } else if (tabs === 'fam') {
      this.famDelHide = false;
      const famLen = this.famIndex.length;
      const famNum = this.famIndex[famLen - 1] + 1;
      this.famIndex.splice(famLen, 0, famNum);
      this.famActive = 'fam' + famNum;
      const control = this.form.controls['familyInformation'] as FormArray;
      control.push(this.initFamilyInformation());
    } else if (tabs === 'rec') {
      this.recDelHide = false;
      const recLen = this.recIndex.length;
      const recNum = this.recIndex[recLen - 1] + 1;
      this.recIndex.splice(recLen, 0, recNum);
      this.recActive = 'rec' + recNum;
      const control = this.form.controls['reference'] as FormArray;
      control.push(this.initReference());
    }
  }

  delTabs(tabs, idx) {
    if (tabs === 'edu') {
      const eduLenPop = this.eduIndex.length;
      for (let i = 0; i < eduLenPop; i++) {
        if (this.eduIndex[i] === idx) {
          this.eduIndex.splice(i, 1);
          const control = <FormArray>this.form.controls['education'];
          control.removeAt(i);
          break;
        }
      }
      if (this.eduIndex.length <= 1) {
        this.eduDelHide = true;
      }
      this.eduActive = 'edu' + this.eduIndex[0];
    } else if (tabs === 'emp') {
      const empLenPop = this.empIndex.length;
      for (let i = 0; i < empLenPop; i++) {
        if (this.empIndex[i] === idx) {
          this.empIndex.splice(i, 1);
          const control = <FormArray>this.form.controls['employmentRecord'];
          control.removeAt(i);
          break;
        }
      }
      if (this.empIndex.length <= 1) {
        this.empDelHide = true;
      }
      this.empActive = 'emp' + this.empIndex[0];
    } else if (tabs === 'fam') {
      const famLenPop = this.famIndex.length;
      for (let i = 0; i < famLenPop; i++) {
        if (this.famIndex[i] === idx) {
          this.famIndex.splice(i, 1);
          const control = <FormArray>this.form.controls['familyInformation'];
          control.removeAt(i);
          break;
        }
      }
      if (this.famIndex.length <= 1) {
        this.famDelHide = true;
      }
      this.famActive = 'fam' + this.famIndex[0];
    } else if (tabs === 'rec') {
      const recLenPop = this.recIndex.length;
      for (let i = 0; i < recLenPop; i++) {
        if (this.recIndex[i] === idx) {
          this.recIndex.splice(i, 1);
          const control = <FormArray>this.form.controls['reference'];
          control.removeAt(i);
          break;
        }
      }
      if (this.recIndex.length <= 1) {
        this.recDelHide = true;
      }
      this.recActive = 'rec' + this.recIndex[0];
    }
  }

  onSubmit() {
    this.patchResume(() => {
      this.router.navigate([
        this.pageMetaService.getCustomPath(
          `/careers/job-opportunities/ability/${this.vacancyId}`
        )
      ]);
    });
  }
  //#endregion

  //#region Patch Resume
  patchResume(finallyCallback: () => void = null) {
    this.resumeData.resume = this.form.value;
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
