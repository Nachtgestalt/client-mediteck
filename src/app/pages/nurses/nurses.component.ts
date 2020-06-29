import { Component, OnInit } from '@angular/core';
import {NurseService} from '../../services/nurse/nurse.service';
import {Router} from '@angular/router';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-nurses',
  templateUrl: './nurses.component.html',
  styleUrls: ['./nurses.component.css']
})
export class NursesComponent implements OnInit {
  queryString = '';
  searchableList: any;

  nurses: any = [];

  constructor( public _nurseService: NurseService,
               public router: Router) {
    this.searchableList = ['Nombre', 'Apellidos'];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._nurseService.getNurses()
      .subscribe(
        res => {
          this.nurses = res;
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
      text: 'Una vez eliminada la enfermera, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._nurseService.deleteNurse(id)
            .subscribe(
              res => {
                swal('Enfermera eliminada exitosamente', {
                  icon: 'success',
                });
                this.reload(true);
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar esta enfermera', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }
}
