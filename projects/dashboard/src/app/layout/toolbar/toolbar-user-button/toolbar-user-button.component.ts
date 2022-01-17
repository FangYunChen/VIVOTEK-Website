import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthService,
  UserLoginViewModel
} from '../../../vvtk-core/services/auth.service';

@Component({
  selector: 'vvtk-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {
  isOpen: boolean;
  userData: Observable<UserLoginViewModel>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userData = this.authService.getUserData();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }
}
