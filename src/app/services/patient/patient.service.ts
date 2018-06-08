import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class PatientService {
  token = localStorage.getItem('token');
  urlPatient = `${URL_SERVICIOS}/pacientes`;

  constructor(private http: HttpClient) {}

  getPatients() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    return this.http.get(this.urlPatient,{headers});
  }

  getPatient(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    const url = `${this.urlPatient}/${id}`;
    return this.http.get(url,{headers});
  }

  postPatient(patient) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(patient)
    return this.http.post(this.urlPatient, body, {headers});
  }

  putPatient(id, doctor) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const url = `${this.urlPatient}/${id}`
    const body = JSON.stringify(doctor);
    return this.http.put(url, body, {headers});
  }

  deletePatient(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    const url = `${this.urlPatient}/${id}`
    return this.http.delete(url,{headers});
  }
}
