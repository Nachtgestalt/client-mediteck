import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilsService} from '../utils/utils.service';
import { map } from 'rxjs/operators';

@Injectable()
export class PatientService {
  token = localStorage.getItem('token');
  urlPatient = `${URL_SERVICIOS}/pacientes`;

  constructor(private http: HttpClient,
              private _utilsService: UtilsService) {}

  getPatients() {
    const url = `${this.urlPatient}?centro=${localStorage.getItem('idMedicalCenter')}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    return this.http.get(url,{headers});
  }

  getPatient(id) {
    const url = `${this.urlPatient}/${id}`;
    return this.http.get(url)
      .pipe(map(res => {
          res[0].Edad = this._utilsService.getAge(res[0].Fecha_nacimiento);
          return res[0];
        })
      );
  }

  postPatient(patient) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(patient);
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
