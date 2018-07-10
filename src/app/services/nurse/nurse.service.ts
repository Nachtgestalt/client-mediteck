import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class NurseService {
  token = localStorage.getItem('token');
  urlNurse = `${URL_SERVICIOS}/enfermeras`;

  constructor(private http: HttpClient) {}

  getNurses() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get(this.urlNurse,{headers});
  }

  getNurse(id) {
    const url = `${this.urlNurse}/${id}`;
    return this.http.get(url);
  }

  postNurse(nurse) {
    const body = JSON.stringify(nurse);
    console.log(body);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.urlNurse, body, {headers});
  }

  putNurse(id, nurse) {
    const url = `${this.urlNurse}/${id}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(nurse);
    return this.http.put(url, body, {headers});
  }

  deleteNurse(id) {
    const url = `${this.urlNurse}/${id}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    return this.http.delete(url, {headers});
  }

}
