import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';

@Injectable()
export class VaccineService {

  token = localStorage.getItem('token');
  urlVaccine = `${URL_SERVICIOS}/vacunas`;

  constructor(private http: HttpClient) {}

  getVaccines() {
    const url = `${this.urlVaccine}?centro=${localStorage.getItem('idMedicalCenter')}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    return this.http.get(url,{headers});
  }

  getVaccine(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    const url = `${this.urlVaccine}/${id}`;
    return this.http.get(url,{headers});
  }

  postVaccine(patient) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(patient)
    return this.http.post(this.urlVaccine, body, {headers});
  }

  putVaccine(id, doctor) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const url = `${this.urlVaccine}/${id}`
    const body = JSON.stringify(doctor);
    return this.http.put(url, body, {headers});
  }

  deleteVaccine(id) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    const url = `${this.urlVaccine}/${id}`
    return this.http.delete(url,{headers});
  }

}
