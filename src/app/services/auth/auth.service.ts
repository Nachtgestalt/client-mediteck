import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
