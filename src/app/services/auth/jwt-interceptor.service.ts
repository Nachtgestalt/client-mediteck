import {Injectable} from '@angular/core';
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
              public router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && request.url.includes(URL_SERVICIOS)) {
          this.user.logout();
        } else if (err.status === 444) {
          const response = err.error;
          localStorage.setItem('idSuscripcion', response.idSuscripcion);
          console.log('INTERCEPTOR ---> ', err, Number(response.Tipo_usuario));

          if (Number(response.Tipo_usuario) === 2) {
            this.router.navigate(['/payments']);
          } else {
            this.router.navigate(['/notPaid']);
          }

        }
      }
    })
      ;
  }
}
