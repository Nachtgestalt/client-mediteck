import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {PACIENTE} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class FirmGuardGuard implements CanActivate {

  user: any;

  constructor() {
  }

  canActivate() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user.Tipo_usuario === PACIENTE) {
      if (this.user.signature !== null && this.user.signature !== '') {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
