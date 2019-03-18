import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {URL_SERVICIOS} from '../../../config/config';

import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';
import {MatDialog} from '@angular/material';
import {InternComponent} from '../../../modals/intern/intern.component';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-patients-urgencias',
  templateUrl: './patients-urgencias.component.html',
  styleUrls: ['./patients-urgencias.component.css']
})
export class PatientsUrgenciasComponent implements OnInit {
  queryString = '';
  searchableList: any;

  egresar: Observable<any>;
  patients: Observable<any>;
  infoPatients: any;

  constructor(public http: HttpClient,
              public dialog: MatDialog) {
    this.searchableList = ['Nombre', 'Apellidos'];
  }

  public alta(id) {
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
              this.loadData();
              // window.location.reload();
            });
        }
      });
  }

  ngOnInit() {
    this.loadData();
  }

  openDialog(idPaciente): void {
    const dialogRef = this.dialog.open(InternComponent, {
      width: '30vw',
      data: {idPaciente}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.loadData();
      }
    });
  }

  loadData() {
    let medCid = localStorage.getItem('idMedicalCenter');
    this.patients = this.http.get(`${URL_SERVICIOS}/pacientes-urgencias?idCentroMedico=${medCid}`);

    this.patients
      .subscribe(data => {
        this.infoPatients = data;
      });
  }

}
