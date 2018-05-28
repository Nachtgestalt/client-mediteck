import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WarehouseService {

  urlWarehouse = `${URL_SERVICIOS}/almacenes`;

  constructor(private http: HttpClient) {}

  getWarehouses() {
    return this.http.get(this.urlWarehouse);
  }

  getWarehouse(id) {
    const url = `${this.urlWarehouse}/${id}`;
    return this.http.get(url);
  }

  postWarehouse(warehouse) {
    const body = JSON.stringify(warehouse)
    return this.http.post(this.urlWarehouse, body);
  }

  putWarehouse(id, warehouse) {
    const url = `${this.urlWarehouse}/${id}`
    const body = JSON.stringify(warehouse);
    return this.http.put(url, body);
  }

  deleteWarehouse(id) {
    const url = `${this.urlWarehouse}/${id}`
    return this.http.delete(url);
  }


}
