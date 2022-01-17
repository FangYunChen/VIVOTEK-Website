import { Component, OnInit } from '@angular/core';

import { AuthService, I18nService } from '@frontdesk/core/services';

@Component({
  selector: 'vvtk-register-complete',
  templateUrl: './register-complete.component.html',
  styleUrls: ['./register-complete.component.scss']
})
export class RegisterCompleteComponent implements OnInit {
  redirectUri = '?redirect=%2F';

  constructor(private authService: AuthService, private i18nService: I18nService) { }

  ngOnInit() {
    this.redirectUri = `${this.i18nService.getSelectedLanguageForLink()}?redirect=${this.authService.getSessionStorage(
      this.authService.STORAGE_KEYS.LOGIN_REDIRECT_URI
    ) || '%2F'}`;
  }
}
