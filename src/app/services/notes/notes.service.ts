import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  URL_NOTES = `${URL_SERVICIOS}/notas`;

  constructor(private _http: HttpClient) { }

  createNote(note) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(note);
    return this._http.post(this.URL_NOTES, body, {headers});
  }
}
