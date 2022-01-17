import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RecoveryAuthForm } from '@frontdesk/core/interfaces';
import { finalize } from 'rxjs/operators';
import { AccountService, VvtkApiService } from '@frontdesk/core/services';
import { ToolsService } from 'projects/dashboard/src/app/vvtk-core/services/tools.service';

@Component({
  selector: 'vvtk-recover-authority',
  templateUrl: './recover-authority.component.html',
  styleUrls: ['./recover-authority.component.scss']
})
export class RecoverAuthorityComponent implements OnInit {

  recoverAuthForm: FormGroup;
  isRecovered = true;
  isLoding = false;

  @Input() recoverAuthMask: boolean;
  @Output() recoverAuthMaskChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() recoverAuthSuccess: boolean;
  @Output() recoverAuthSuccessChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private get isRecovered$() {
    return this.vvtkApiService.get<boolean>({
      path: 'api/Accounts/RecoverAuthority',
      disableLanguage: true,
      needAuth: true
    });
  }

  constructor(
    private accountService: AccountService,
    private vvtkApiService: VvtkApiService,
    private formBuilder: FormBuilder,
    private toolsService: ToolsService,
  ) { }

  ngOnInit() {
    this.initReAuthForm();
    this.isRecovered$.subscribe(x => this.isRecovered = x);
  }


  recoveryAuthority() {
    this.isLoding = true;
    const recoverAuthFormData = this.recoverAuthForm.value as RecoveryAuthForm;
    this.accountService.recoverAuth(recoverAuthFormData)
      .pipe(finalize(() => this.isLoding = false))
      .subscribe(
        // true => 成功
        // false => 失敗，帳號或密碼有誤
        result => {
          if (result) {
            this.isRecovered = true;
            this.recoverAuthMask = true;
            this.recoverAuthSuccess = true;
          } else {
            this.recoverAuthMask = true;
            this.recoverAuthSuccess = false;
            this.initReAuthForm();
            this.toolsService.showSnackBar('Recovery authority failed, account or password is incorrect.', 3000);
          }
        }
      );
  }

  initReAuthForm() {
    this.recoverAuthForm = this.formBuilder.group({
      account: [
        '',
        Validators.compose([Validators.required, Validators.email])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      checkPassword: [
        '',
        Validators.compose([
          Validators.required,
          this.accountService.passwordRepeatValidator('password')
        ])
      ]
    });
  }

}
