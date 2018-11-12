import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/index';
import {ConsultationService} from '../consultation/consultation.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationDetailResolveService implements Resolve<any>{

  constructor(private _consultation: ConsultationService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = route.params['id'];
    return this._consultation.getConsultation(id);
  }
}
