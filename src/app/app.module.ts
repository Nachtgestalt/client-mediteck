import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {APP_ROUTING} from './app.routes';
import { LoginComponent } from './login/login.component';
import {PagesModule} from './pages/pages.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicesModule} from './services/services.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalsModule} from './modals/modals.module';
import {CalendarModule} from 'angular-calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';

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
      apiKey: 'AIzaSyCR6VvN3971kjrUyqyyiaWX0mtSj22JEHk',
      authDomain: 'clinitec-f4f3f.firebaseapp.com',
      databaseURL: 'https://clinitec-f4f3f.firebaseio.com',
      projectId: 'clinitec-f4f3f',
      storageBucket: 'clinitec-f4f3f.appspot.com',
      messagingSenderId: '124604988463'
    }),
    // AngularFireModule.initializeApp({
    //   apiKey: 'AIzaSyDEGyy36ZZI0fr9_0vBEmCLIFS5vYTa2-k',
    //   authDomain: 'clinitec-f4f3f.firebaseapp.com',
    //   databaseURL: 'https://clinitec-f4f3f.firebaseio.com',
    //   projectId: 'clinitec-f4f3f',
    //   storageBucket: 'clinitec-f4f3f.appspot.com',
    //   messagingSenderId: '124604988463'
    // }),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
