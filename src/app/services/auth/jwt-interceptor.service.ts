import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';
import {URL_SERVICIOS} from '../../config/config';
import {UserService} from '../user/user.service';

@Injectable()
export class JwtInterceptorService {

  constructor(public auth: AuthService,
              private user: UserService,
              public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && request.url.includes(URL_SERVICIOS)) {
          this.user.logout();
          // this.router.navigate(['/login']);
          // console.warn('No hay token');
          // redirect to the login route
          // or show a modal
        } else if (err.status === 444) {
          localStorage.setItem('idCentro_medico', err.error.idCentro_medico);
          console.log(err);
          this.router.navigate(['/payments']);
        }
      }
    });
  }
}
