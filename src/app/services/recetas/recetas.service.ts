import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  url = `${URL_SERVICIOS}/recetas-paciente`;
  headers: any;
  token: string;

  constructor(
    private _http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.headers = {
      'Authorization': this.token
    };
  }

  getRecetas(idPaciente: number) {
    return this._http.get(this.url + '?idPaciente=' + idPaciente, {headers: this.headers});
  }
}
