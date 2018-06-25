import { Injectable } from '@angular/core';
import {CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user.interface';
import {Oauth} from '../../interfaces/oauth.interface';

@Injectable()
export class UserService {
  urlAuth = `${URL_SERVICIOS}/oauth/token`;
  urlLogin = `${URL_SERVICIOS}/login-usuario`
  token: string;
  user: User;

  constructor(public http: HttpClient,
              private router: Router) {
    this.loadStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage () {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  auth(user: User) {
    let headers = new HttpHeaders();

    const credentials = `grant_type=${GRANT_TYPE}
    &client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}
    &username=${user.username}&password=${user.password}`

    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.urlAuth, credentials, {observe: 'response', headers})
      .map(
        (resp: HttpResponse<any>) => {
          console.log(resp);
          this.token = `${resp.body.token_type} ${resp.body.access_token}`;
          // this.token = resp.headers.get('authorization');
          return this.token;
        }
        );
  }

  getDataUser(username) {
    const url = `${this.urlLogin}/${username}`;
    let headers: HttpHeaders = new HttpHeaders();
    console.log(this.token);
    // headers = headers.append('Authorization', this.token);
    return this.http.get(url);
  }

  setTokenInStorage(token: string) {
    localStorage.setItem('token', token);
  }

  setInStorage(usuario) {
    console.log(usuario)
    localStorage.setItem('idMedicalCenter', usuario.idCentro_medico);
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('idMedicalCenter')
    this.router.navigate(['/login']);
  }

}
