import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  urlMedicalHistory = `${URL_SERVICIOS}/historia`

  constructor(private http: HttpClient) { }

  postMedicalHistory(medicalHistory) {
    const body = JSON.stringify(medicalHistory);
    console.log('Cuerpo de postMedicalHistory: ', body);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post(this.urlMedicalHistory, body, {headers});
  }

  getMedicalHistory(id) {
    const url = `${this.urlMedicalHistory}/${id}`;
    return this.http.get(url);
  }
}
