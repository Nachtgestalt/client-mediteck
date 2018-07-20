import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular5-social-login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { getDefaultService } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {
  visible: boolean = true;
  gDates: Observable<any>;
  dates = [
    {

    }
  ]

  constructor(private socialAuthService: AuthService, public http: HttpClient){
    /*let google = localStorage.getItem('google_token');
    if(google){
      this.visible = false;
      this.getDates();
    }*/

    //Google Auth
    let client_id = "188404057526-o1tft7b3goam4rph480151pk86ufgj2c.apps.googleusercontent.com";
    let redirect_uri = "http://localhost:4200/cita";
    let url = `https://accounts.google.com/o/oauth2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=https://www.googleapis.com/auth/calendar&approval_prompt=force&response_type=token`;
    window.location.href = url;
    //var token = url.split('access_token=')[1].split('&token_type')[0
    //Sending the google calendar invite from the google api
    /*gapi.client.setApiKey("API-KEY");
    var request = gapi.client.request({
      'path': `/calendar/v3/calendars/${}/events`,
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer`
      },
      'callback': function (jsonR, rawR) {
        console.log(jsonR);
      }
    });*/
    //Google Auth
  }
  
  ngOnInit() {
  }

  public googleAuth() {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        localStorage.setItem('google_email', userData.email)
        localStorage.setItem('google_token', userData.idToken)
        this.visible = false;
        this.getDates();
      }
    )
  }

  public getDates(){
    //let url = "https://www.googleapis.com/calendar/v3/users/me/calendarList"
    let url = `https://www.googleapis.com/calendar/v3/calendars/${localStorage.getItem('google_email')}/events`
    this.gDates = this.http.get(url,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('google_token')}`
      }
    })

    this.gDates
    .subscribe(data => {
      console.log(data);  
    })
  }
}
