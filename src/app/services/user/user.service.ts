import {Injectable} from '@angular/core';
import {CLIENT_ID, CLIENT_SECRET, DESTINO, GRANT_TYPE, URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../interfaces/user.interface';
import {Oauth} from '../../interfaces/oauth.interface';
import {post} from 'selenium-webdriver/http';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class UserService {
  urlAuth = `${URL_SERVICIOS}/oauth/token`;
  urlLogin = `${URL_SERVICIOS}/login-usuario`;
  token: string;
  user: User;

  constructor(public http: HttpClient,
              private router: Router,
              private fireAuth: AuthService) {
    this.loadStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  loadStorage() {
    if (localStorage.getItem('token')) {
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
    &username=${user.username}&password=${user.password}&Destino=${DESTINO}`;

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
    return this.http.get(url);
  }

  setTokenInStorage(token: string) {
    localStorage.setItem('token', token);
  }

  setInStorage(usuario, menu, idSuscripcion?) {
    console.log(usuario);
    localStorage.setItem('idSuscripcion', idSuscripcion);
    localStorage.setItem('idMedicalCenter', usuario.idCentro_medico);
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('idMedicalCenter');
    this.fireAuth.logout();
    this.router.navigate(['/login']);
  }

  isValidSuscription() {
    const url = `${URL_SERVICIOS}/isValidSuscription`;
    const body = {
      id: localStorage.getItem('idMedicalCenter')
    };
    return this.http.post(url, body);
  }

  getUser(id: number) {
    const token = localStorage.getItem('token');
    return this.http.get(`${URL_SERVICIOS}/usuarios/${id}`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    });
  }

  setUsername(username: string) {
    localStorage.setItem('username', username);
  }
}
