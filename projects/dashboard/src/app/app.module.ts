import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  AppInsightsService,
  ApplicationInsightsModule
} from '@markpieszak/ng-application-insights';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { PagesModule } from './pages/pages.module';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    // Routing
    AppRoutingModule,
    // my Module
    PagesModule,
    SharedModule,
    LayoutModule,
    SharedMaterialModule,
    // Azure Application Insights
    // https://github.com/MarkPieszak/angular-application-insights
    ApplicationInsightsModule.forRoot({
      instrumentationKey: environment.appInsightsInstrumentationKey
    })
  ],
  providers: [AppInsightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
