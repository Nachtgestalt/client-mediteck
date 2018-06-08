import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorService} from '../../services/doctor/doctor.service';

import * as _swal from 'sweetalert';
import {SweetAlert} from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {
  doctores: any = [];


  constructor(public router: Router,
              public _doctorService: DoctorService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._doctorService.getDoctors()
      .subscribe(
        res => {
          console.log(res);
          this.doctores = res;
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
      text: 'Una vez eliminado el medico, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._doctorService.deleteDoctor(id)
            .subscribe(
              res => {
                swal('Medico eliminado exitosamente', {
                  icon: 'success',
                });
                this.reload(true);
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar este medico', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }
}

