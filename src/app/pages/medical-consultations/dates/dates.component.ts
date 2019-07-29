import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {URL_LOCAL, GOOGLE_CLIENT_ID} from '../../../config/config';
import {CalendarComponent} from 'ng-fullcalendar';
import {OptionsInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import {AuthService} from '../../../services/auth/auth.service';
import {ScheduleDateComponent} from '../../../modals/schedule-date/schedule-date.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css']
})

export class DatesComponent implements OnInit {
  google_user = localStorage.getItem('google_id_token');
  visible: boolean = true;
  gDates: Observable<any>;
  dates: any;
  client_id: string = GOOGLE_CLIENT_ID;
  redirect_uri: string = `${URL_LOCAL}/cita`;
  options: OptionsInput;
  @ViewChild('fullcalendar') ucCalendar: CalendarComponent;

  constructor(public http: HttpClient,
              public auth: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('Google user', this.google_user);
    this.options = {
      locale: 'es',
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        list: 'Lista'
      },
      editable: false,
      eventLimit: false,
      header: {
        left: 'prev today next',
        center: 'title',
        right: 'dayGridMonth ,timeGridWeek ,timeGridDay ,listMonth'
      },
      selectable: true,
      events: [],
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    };
    setTimeout(() => this.auth.getCalendar(), 2000);
  }

  insertEvent() {
    const dialogRef = this.dialog.open(ScheduleDateComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  updateCalendar() {
  }
}
