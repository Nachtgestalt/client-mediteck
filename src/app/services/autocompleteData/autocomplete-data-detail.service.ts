import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {PatientService} from '../patient/patient.service';
import {Observable} from 'rxjs/index';
import {AutocompleteDataService} from './autocomplete-data.service';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteDataDetailService implements Resolve<any> {

  constructor(private _autocompleteDataService: AutocompleteDataService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this._autocompleteDataService.getDiagnostics(1);
  }
}
