import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../vvtk-core/services/auth.service';

@Component({
  selector: 'vvtk-signin',
  template: '<div></div>'
})
export class ExternalSigninComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const redirectUri = this.authService.getSessionStorage(
      this.authService.STORAGE_KEYS.LOGIN_REDIRECT_URI
    );
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        // api server 回傳錯誤訊息，可能為 user 沒有授權等等原因
        alert(params['error'].replace(/\+/g, ' '));
        this.router.navigateByUrl(redirectUri);
      } else {
        this.authService.externalLogin(
          params,
          redirectUri,
          '/register',
          '/register-verification'
        );
      }
    });
  }
}
