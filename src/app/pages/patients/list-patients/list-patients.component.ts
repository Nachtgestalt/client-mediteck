import { Component, OnInit } from '@angular/core';
import {PatientService} from '../../../services/patient/patient.service';
import {Router} from '@angular/router';
import {DoctorService} from '../../../services/doctor/doctor.service';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {
  queryString = '';
  searchableList: any;

  patients = [];

  constructor( public _patientService: PatientService,
               public router: Router) {
    this.searchableList = ['Nombre', 'Apellidos'];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._patientService.getPatients()
      .subscribe(
        (res: any) => {
          this.patients = res;
          console.log(res);
        }
      );
  }

  reload(cerrado) {
    if (cerrado) {
      this.loadData();
    }
  }
}
