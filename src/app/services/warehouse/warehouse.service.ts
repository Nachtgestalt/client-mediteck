import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class WarehouseService {
  token = localStorage.getItem('token');
  urlWarehouse = `${URL_SERVICIOS}/almacenes`;

  constructor(private http: HttpClient) {}

  getWarehouses() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    return this.http.get(this.urlWarehouse, {headers});
  }

  getWarehouse(id) {
    const url = `${this.urlWarehouse}/${id}`;
    return this.http.get(url);
  }

  postWarehouse(warehouse) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(warehouse);
    return this.http.post(this.urlWarehouse, body, {headers});
  }

  putWarehouse(id, warehouse) {
    const url = `${this.urlWarehouse}/${id}`;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', this.token);
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(warehouse);
    return this.http.put(url, body, {headers});
  }

  deleteWarehouse(id) {
    const url = `${this.urlWarehouse}/${id}`
    return this.http.delete(url);
  }


}
