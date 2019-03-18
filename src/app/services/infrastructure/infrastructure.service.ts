import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  private URL_CAMAS = `${URL_SERVICIOS}/camas`;
  private URL_SECTION = `${URL_SERVICIOS}/infraestructura`;
  private medical_center = localStorage.getItem('idMedicalCenter');

  constructor(private _http: HttpClient) { }

  createBed(bed) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http.post(this.URL_CAMAS, bed, {headers});
  }

  listCamas() {
    let queryParams = new HttpParams().append('centro', this.medical_center);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http.get(this.URL_CAMAS, {headers, params: queryParams});
  }

  listSections() {
    let queryParams = new HttpParams().append('centro', this.medical_center);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http.get(this.URL_SECTION, {headers, params: queryParams});
  }

  createSection(section) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http.post(this.URL_SECTION, section, {headers});
  }

  deleteSection(section)  {
    const url = `${this.URL_SECTION}/${section.id}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._http.delete(url, {headers});
  }

}
