import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {PatientService} from '../patient/patient.service';
import {Observable} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class PatientDetailsResolveService implements Resolve<any> {

  constructor(private _patientService: PatientService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    let id = +route.params['id'];
    return this._patientService.getPatient(id);
  }
}
