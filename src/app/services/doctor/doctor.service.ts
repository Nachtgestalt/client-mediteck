import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DoctorService {

  urlDoctor = `${URL_SERVICIOS}/medicos`;

  constructor(private http: HttpClient) {}

  getDoctors() {
    return this.http.get(this.urlDoctor);
  }

  getDoctor(id) {
    const url = `${this.urlDoctor}/${id}`;
    return this.http.get(url);
  }

  postDoctor(doctor) {
    const body = JSON.stringify(doctor)
    return this.http.post(this.urlDoctor, body);
  }

  putDoctor(id, doctor) {
    const url = `${this.urlDoctor}/${id}`
    const body = JSON.stringify(doctor);
    return this.http.put(url, body);
  }

  deleteDoctor(id) {
    const url = `${this.urlDoctor}/${id}`
    return this.http.delete(url);
  }

}
