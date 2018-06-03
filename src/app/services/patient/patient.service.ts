import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PatientService {

  urlPatient = `${URL_SERVICIOS}/pacientes`;

  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get(this.urlPatient);
  }

  getPatient(id) {
    const url = `${this.urlPatient}/${id}`;
    return this.http.get(url);
  }

  postPatient(doctor) {
    const body = JSON.stringify(doctor)
    return this.http.post(this.urlPatient, body);
  }

  putPatient(id, doctor) {
    const url = `${this.urlPatient}/${id}`
    const body = JSON.stringify(doctor);
    return this.http.put(url, body);
  }

  deletePatient(id) {
    const url = `${this.urlPatient}/${id}`
    return this.http.delete(url);
  }
}
