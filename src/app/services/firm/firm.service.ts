import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirmService {
  url = `${URL_SERVICIOS}/pacientes-signature`;
  headers: any;
  token: string;
  acceptTerminus: boolean;

  constructor(
    private _http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.headers = {
      'Authorization': this.token
    };
  }

  setFirm(firm: string, id: number) {
    return this._http.post(this.url,
      {
        id: id,
        signature: firm
      },
      {headers: this.headers}
      );
  }
}
