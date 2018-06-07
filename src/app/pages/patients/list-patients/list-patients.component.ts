import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient/patient.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  patients = [];

  constructor( public _patientService: PatientService) { }

  ngOnInit() {
    this._patientService.getPatients()
      .subscribe(
        (res: any) => {
          this.patients = res;
          console.log(res);
        }
      );
  }

}
