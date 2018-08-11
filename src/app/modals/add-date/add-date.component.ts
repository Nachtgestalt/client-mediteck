import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-date',
  templateUrl: './add-date.component.html',
  styleUrls: ['./add-date.component.css']
})
export class AddDateComponent implements OnInit {
  
  private modalRef: NgbModalRef;

  summary:string;
  location:string;
  start_dateTime: any;
  end_dateTime:any;

  constructor(private modalService: NgbModal, public http:HttpClient){}

  open(content){
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit() { }

  addDate(){
    let url_calendar = "https://www.googleapis.com/calendar/v3/calendars/sebastian.barrera1996@gmail.com/events";
    //let url_calendar = `https://www.googleapis.com/calendar/v3/calendars/${localStorage.getItem('google_calendar_id')}/events`
    let au = {
      'summary': this.summary,
      'location': this.location,
      'start': {
        'dateTime': this.start_dateTime
      },
      'end': {
        'dateTime': this.end_dateTime
      },
    }
    this.http.post(url_calendar,au,{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('google_token')}`
      }
    }).subscribe(
      data =>{
        console.log(data);
      },
      error=>{
        console.error(error);
      }
    );
  }
}
