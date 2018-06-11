import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {VaccineService} from '../../../services/vaccine/vaccine.service';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {

  vaccines: any = [];


  constructor(public router: Router,
              public _vaccineService: VaccineService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._vaccineService.getVaccines()
      .subscribe(
        res => {
          console.log(res);
          this.vaccines = res;
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
          this._vaccineService.deleteVaccine(id)
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
