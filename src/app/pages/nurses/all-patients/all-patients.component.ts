import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../../config/config';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit {
  patients:Observable<any>;
  infoPatients: any;
  constructor(public http:HttpClient) {

    let medCid = localStorage.getItem('idMedicalCenter');
    this.patients = this.http.get(`${URL_SERVICIOS}/pacientes-ingresados?idCentroMedico=${medCid}`);

    this.patients
    .subscribe(data => {
       this.infoPatients = data;
    });
  }

  medInd(indicaciones, medicamentos){
    console.log(indicaciones,medicamentos);
  }

  ngOnInit() {}
}



