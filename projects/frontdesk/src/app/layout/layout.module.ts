import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ExternalSigninComponent } from './components/external-signin/external-signin.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgetPopupComponent } from './components/forget-popup/forget-popup.component';
import { HeaderComponent } from './components/header/header.component';
import { LanguageMenuComponent } from './components/header/language-menu/language-menu.component';
import { SideMenuComponent } from './components/header/side-menu/side-menu.component';
import { TopMenuComponent } from './components/header/top-menu/top-menu.component';
import { I18nComponent } from './components/i18n/i18n.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { SignPopupComponent } from './components/sign-popup/sign-popup.component';
import { SearchPageComponent } from './components/search-page/search-page.component';

// import { HomeSectionComponent } from '../pages/home/components/home-section/home-section.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  declarations: [
    ExternalSigninComponent,
    I18nComponent,
    LayoutComponent,
    HeaderComponent,
    LanguageMenuComponent,
    PrivacyComponent,
    SideMenuComponent,
    TopMenuComponent,
    FooterComponent,
    ForgetPopupComponent,
    SignPopupComponent,
    PageNotFoundComponent,
    SearchPageComponent
  ],
  entryComponents: [PrivacyComponent]
})
export class LayoutModule {}
