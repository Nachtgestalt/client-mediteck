import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AuthService} from '../auth/Auth.service';

@Injectable()
export class SecurityTokenInterceptor implements HttpInterceptor {

  constructor(public _auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `${this._auth.getToken()}`
      }
    });
    return next.handle(request);
  }

  // token = localStorage.getItem('token');
  //
  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   request = request.clone({
  //     setHeaders: {
  //       Autorizathion: localStorage.getItem('token')
  //     }
  //   });
  //   return next.handle(request);
  // }
  //
  // constructor() { }

}
