import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class NurseService {
  urlNurse = `${URL_SERVICIOS}/enfermeras`;

  constructor(private http: HttpClient) {}

  getNurses() {
    return this.http.get(this.urlNurse);
  }

  getNurse(id) {
    const url = `${this.urlNurse}/${id}`;
    return this.http.get(url);
  }

  postNurse(nurse) {
    const body = JSON.stringify(nurse)
    return this.http.post(this.urlNurse, body);
  }

  putNurse(id, nurse) {
    const url = `${this.urlNurse}/${id}`
    const body = JSON.stringify(nurse);
    return this.http.put(url, body);
  }

  deleteNurse(id) {
    const url = `${this.urlNurse}/${id}`
    return this.http.delete(url);
  }

}
