import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL_LOCAL, GOOGLE_CLIENT_ID } from '../../../config/config';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})
export class DatesComponent implements OnInit {
  visible: boolean = true;
  gDates: Observable<any>;
  dates: any;
  client_id: string = GOOGLE_CLIENT_ID;
  redirect_uri: string = `${URL_LOCAL}/cita`;
  

  constructor(public http: HttpClient){
    //Google Auth
    if(window.location.href.indexOf("access_token") > -1){
      let url = window.location.href;  
      let au = url.split('access_token=')[1].split('&token_type')[0];
      localStorage.setItem('google_token', au);
      window.location.href = this.redirect_uri;
    }

    let google = localStorage.getItem('google_token');
    if(google){
      this.visible = false;
      this.getDates();
    }
  }

  ngOnInit(){}

  public googleAuth() {
    let url = `https://accounts.google.com/o/oauth2/auth?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&scope=https://www.googleapis.com/auth/calendar&approval_prompt=force&response_type=token`;
    window.location.href = url;
  }

  public getDates(){
    if(!localStorage.getItem('google_calendar_id')){
      let url = "https://www.googleapis.com/calendar/v3/users/me/calendarList"
      this.gDates = this.http.get(url,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('google_token')}`
        }
      })
  
      this.gDates
      .subscribe(data => {
         localStorage.setItem('google_calendar_id',data.items[0].id); 
      })
    }

    //let url_calendar = "https://www.googleapis.com/calendar/v3/calendars/sebastian.barrera1996@gmail.com/events";
    let url_calendar = `https://www.googleapis.com/calendar/v3/calendars/${localStorage.getItem('google_calendar_id')}/events`
    this.gDates = this.http.get(url_calendar,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('google_token')}`
      }
    })

    this.gDates
    .subscribe(data => {
        this.dates = data.items;
    })

  }
}
