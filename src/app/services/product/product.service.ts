import { Injectable } from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ProductService {
  urlProduct = `${URL_SERVICIOS}/farmacia`;

  constructor(private http: HttpClient) {}

  getProducts() {
    const url = `${this.urlProduct}?centro=${localStorage.getItem('idMedicalCenter')}`;
    return this.http.get(url);
  }

  getProduct(id) {
    const url = `${this.urlProduct}/${id}`;
    return this.http.get(url);
  }

  postProduct(product) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const body = JSON.stringify(product);
    return this.http.post(this.urlProduct, body, {headers});
  }

  putProduct(id, doctor) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const url = `${this.urlProduct}/${id}`;
    const body = JSON.stringify(doctor);
    return this.http.put(url, body, {headers});
  }

  deleteProduct(id) {
    const url = `${this.urlProduct}/${id}`
    return this.http.delete(url);
  }
}
