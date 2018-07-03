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

  delete(id) {
    swal({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado el paciente, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._patientService.deletePatient(id)
            .subscribe(
              res => {
                swal('Paciente eliminado exitosamente', {
                  icon: 'success',
                });
                this.reload(true);
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar este paciente', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }

}
