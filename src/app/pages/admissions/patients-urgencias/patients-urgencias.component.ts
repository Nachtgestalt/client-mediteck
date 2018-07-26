import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../../config/config';

import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-patients-urgencias',
  templateUrl: './patients-urgencias.component.html',
  styleUrls: ['./patients-urgencias.component.css']
})
export class PatientsUrgenciasComponent implements OnInit {

  egresar: Observable<any>;
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

  public alta(id){
    swal({
      title: '¿Estas seguro?',
      text: 'De querer egresar a este paciente',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this.egresar = this.http.get(`${URL_SERVICIOS}/paciente-altaUrgencia?idPaciente=${id}`);
      
          this.egresar
          .subscribe(data => {
            console.log(data);
            window.location.reload();
          });
        }
    });
  }
  
  ngOnInit() {}

}
