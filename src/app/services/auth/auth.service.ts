import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subject} from 'rxjs/Subject';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Subject<any> = new Subject();
  calendarItems$ = new Subject();

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    setTimeout(() => this.user$.next(localStorage.getItem('google_id_token') != null), 100);
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('Loaded client');

      gapi.client.init({
        apiKey: 'AIzaSyC-ECMVVIWyVn4-TPh7hSGb-M8RbTgQVi0',
        clientId: '824775533589-jm0svg8m49chrs439lssp6lflqloodvp.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar'
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    });

  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;
    localStorage.setItem('google_id_token', googleUser.getAuthResponse().id_token);
    this.user$.next(true);

    console.log(googleUser);
    await this.getCalendar();

    // await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
  }

  async logout() {
    const googleAuth = gapi.auth2.getAuthInstance();
    await googleAuth.signOut();
    localStorage.removeItem('google_id_token');
    this.user$.next(false);
  }

  async getCalendar() {
    let calendarItems = [];
    const auDate = new Date().toISOString();
    console.log();
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });

    console.log(events);

    events.result.items.forEach(date => {
      const tmp_event = {
        title: `${date.summary ? date.summary : 'Sin descripción'} - Descripción: ${date.description}`,
        start: `${date.start ? date.start.dateTime : auDate}`,
        end: `${date.end ? date.end.dateTime : auDate}`,
        allDay: false
      };
      calendarItems.push(tmp_event);
    });
    this.calendarItems$.next(calendarItems);
  }

  async insertEvent(payload) {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: new Date(payload.Fecha_inicio).toISOString(),
        timeZone: 'America/Mexico_City'
      },
      end: {
        dateTime: new Date(payload.Fecha_fin).toISOString(),
        timeZone: 'America/Mexico_City'
      },
      summary: `Cita con ${payload.Paciente}`,
      description: payload.Descripcion
    });

    await this.getCalendar();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}

const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
