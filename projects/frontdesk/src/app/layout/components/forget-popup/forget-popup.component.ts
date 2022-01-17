import { isPlatformServer } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ForgetPasswordForm } from '../../../vvtk-core/interfaces';
import { AccountService, VvtkService } from '../../../vvtk-core/services';

@Component({
  selector: 'vvtk-forget-popup',
  templateUrl: './forget-popup.component.html',
  styleUrls: ['./forget-popup.component.scss']
})
export class ForgetPopupComponent implements OnInit {
  @Input() signMask; // sign
  @Input() forgetMask; // forget
  @Output() signWindow = new EventEmitter<any>(); // sign
  @Output() forgetWindow = new EventEmitter<any>(); // forget
  form: FormGroup;
  loadingShow: boolean;
  showBlock = '';

  constructor(
    private accountSrv: AccountService,
    private vvtkSrv: VvtkService,
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platform_id
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.accountSrv.usernameRegexPattern)
        ])
      ]
    });
  }

  submit() {
    this.loadingShow = true;
    if (isPlatformServer(this.platform_id)) {
      return; // Server side 不會執行這個
    }

    const formData = this.form.value as ForgetPasswordForm;
    formData.lang = this.vvtkSrv.language;
    formData.confirmUrl = `${document.location.origin}/forget-password`;
    const sub$ = this.accountSrv
      .forgetPassword(formData)
      .pipe(
        catchError(error => {
          return of(error);
        }),
        finalize(() => {
          sub$.unsubscribe();
        })
      )

      .subscribe(resp => {
        if (resp.ok) {
          this.showBlock = 'success';
          setTimeout(() => {
            this.loadingShow = false;
            this.showBlock = '';
            this.signMask = true;
            this.forgetMask = false;
            this.signWindow.emit(this.signMask);
            this.forgetWindow.emit(this.forgetMask);
          }, 2000);
        } else if (resp.status === 404) {
          this.showBlock = 'failure';
          setTimeout(() => {
            this.loadingShow = false;
            this.showBlock = '';
          }, 2000);
        }
      });
  }

  // forget close
  closeForget($event) {
    this.forgetMask = false;
    this.forgetWindow.emit(this.forgetMask);
  }
  openSign($event) {
    this.signMask = true;
    this.forgetMask = false;
    this.signWindow.emit(this.signMask);
    this.forgetWindow.emit(this.forgetMask);
  }
}
