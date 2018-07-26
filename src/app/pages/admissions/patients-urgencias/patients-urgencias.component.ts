import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../../config/config';

@Component({
  selector: 'app-patients-urgencias',
  templateUrl: './patients-urgencias.component.html',
  styleUrls: ['./patients-urgencias.component.css']
})
export class PatientsUrgenciasComponent implements OnInit {

  patients:Observable<any>;
  infoPatients: any;
  
  constructor(public http:HttpClient){
    let medCid = localStorage.getItem('idMedicalCenter');
    this.patients = this.http.get(`${URL_SERVICIOS}/pacientes-urgencias?idCentroMedico=${medCid}`);

    this.patients
    .subscribe(data => {
       this.infoPatients = data;
    });
  }

  ngOnInit() {}

}
