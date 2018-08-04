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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    APP_ROUTING,
    ModalsModule,
    NgbModule.forRoot(),
    CalendarModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDEGyy36ZZI0fr9_0vBEmCLIFS5vYTa2-k",
      authDomain: "clinitec-f4f3f.firebaseapp.com",
      databaseURL: "https://clinitec-f4f3f.firebaseio.com",
      projectId: "clinitec-f4f3f",
      storageBucket: "clinitec-f4f3f.appspot.com",
      messagingSenderId: "124604988463"
    }),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
