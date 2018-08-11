import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {URL_SERVICIOS} from '../../config/config';
import {UserService} from '../user/user.service';
import {Router} from '@angular/router';

@Injectable()
export class TokenInterceptorService {

  constructor(public auth: AuthService, private _userService: UserService,
              public router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone();

    if (request.url.includes(URL_SERVICIOS)) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}

@Injectable()
export class isValidSuscriptionInterceptor implements HttpInterceptor {

  constructor(private _userService: UserService,
              public router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this._userService.isValidSuscription()
      .subscribe(
        (res: any) => {
          if ( res.valid ) {
            return next.handle(req)
          } else {
            this.router.navigate(['/login']);
          }
        },
        error1 => {
          this.router.navigate(['/login']);
        }
      );

    // return next.handle(req);
  }
}
