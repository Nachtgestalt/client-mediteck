import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import {APP_ROUTING} from './app.routes';
import { LoginComponent } from './login/login.component';
import {PagesModule} from './pages/pages.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LeftsidebarComponent } from './shared/leftsidebar/leftsidebar.component';
import {ServicesModule} from './services/services.module';
import { EditDoctorComponent } from './modals/edit-doctor/edit-doctor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalsModule} from './modals/modals.module';
import { FilterPipe } from './pipes/filter.pipe';
import {CalendarModule} from 'angular-calendar';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";


export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("188404057526-o1tft7b3goam4rph480151pk86ufgj2c.apps.googleusercontent.com")
        },
      ]
  )
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    APP_ROUTING,
    ModalsModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
