import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Subject} from 'rxjs/Subject';
import {auth} from 'firebase/app';
import {Observable} from 'rxjs';
import * as moment from 'moment';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userFirebase$: Observable<firebase.User>;

  user$: Subject<any> = new Subject();
  calendarItems$ = new Subject();
  calendarItems = [];

  constructor(public afAuth: AngularFireAuth) {
    this.initClient();
    this.userFirebase$ = afAuth.authState;
    // setTimeout(() => this.user$.next(localStorage.getItem('google_id_token') != null), 100);
  }

  // Initialize the Google API client with desired scopes
  initClient() {
    gapi.load('client', () => {
      console.log('Loaded client');

      gapi.client.init({
        apiKey: 'AIzaSyCR6VvN3971kjrUyqyyiaWX0mtSj22JEHk',
        // apiKey: 'AIzaSyCbFB4KgEA6xtYwipfcJSA-SZ1a-5TALk8',
        // apiKey: 'AIzaSyDQH-b3Q8dx2wrxfMaSktAIsMDjbKYvBmA',
        clientId: '795718094400-nkb430lqpgk570e73ti9qko1j24ogljr.apps.googleusercontent.com',
        // clientId: '795718094400-nkb430lqpgk570e73ti9qko1j24ogljr.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar',
        cookiepolicy: 'single_host_origin'
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));
    });

  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;

    console.log('Google user', googleUser);

    const credential = auth.GoogleAuthProvider.credential(token);

    const provider = new auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/calendar');

    // await this.afAuth.auth.signInWithPopup(provider);
    await this.afAuth.auth.signInWithCredential(credential);

    // localStorage.setItem('google_id_token', googleUser.getAuthResponse().id_token);
    // this.user$.next(true);
    await this.getCalendar();
    // await this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    // const googleAuth = gapi.auth2.getAuthInstance();
    // await googleAuth.signOut();
    // localStorage.removeItem('google_id_token');
    // this.user$.next(false);
  }

  async getCalendar() {
    const calendarItems = [];
    const startDate = moment().subtract(3, 'days').toISOString();
    const auDate = new Date().toISOString();
    console.log();
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      // timeMin: new Date().toISOString(),
      timeMin: startDate,
      showDeleted: false,
      singleEvents: true,
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
    this.calendarItems = calendarItems;
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
      description: payload.Descripcion,
      location: payload.Lugar
    });

    await this.getCalendar();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}

const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
