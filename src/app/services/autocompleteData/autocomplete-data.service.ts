import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteDataService {

  constructor(private http: HttpClient) { }

  getDiagnostics(value) {
    let params = new HttpParams().set('match', value);
    const url = `${URL_SERVICIOS}/getEnfermedades`;
    return this.http.get(url, {params})
      .pipe(
        map(
          res => {
            console.log(res);
            if (res !== null) {
              console.log('Estoy dentro de !== null');
              return res;
            } else {
              console.log('Estoy dentro de null');
              return [{
                Enfermedades: ''
              }];
            }
          }
        )
      );
  }

  getMedicines(value) {
    const params = new HttpParams().set('match', value);
    const url = `${URL_SERVICIOS}/getMedicinas`;
    return this.http.get(url, {params})
      .pipe(
        map(
          res => {
            if (res !== null) {
              return res;
            } else {
              return [{
                Compuesto: 'Sin medicamentos',
                Marcas: '',
                Presentacion: '',
                Cantidad: ''
              }];
            }
            // return res;
          }
        )
      );
  }

  getSpecialitys() {
    const url = `${URL_SERVICIOS}/getEspecialidades`;
    return this.http.get(url);
  }

  getLaboratorys() {
    const url = `${URL_SERVICIOS}/getLaboratorios`;
    return this.http.get(url);
  }
}
