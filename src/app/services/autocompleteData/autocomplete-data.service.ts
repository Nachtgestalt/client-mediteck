import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteDataService {

  constructor(private http: HttpClient) { }

  getDiagnostics(value) {
    let params = new HttpParams().set('match', value);
    const url = `${URL_SERVICIOS}/getEnfermedades`;
    return this.http.get(url, {params});

  }
}
