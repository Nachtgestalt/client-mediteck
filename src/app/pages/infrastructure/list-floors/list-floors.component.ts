import {Component, OnInit} from '@angular/core';
import {InfrastructureService} from '../../../services/infrastructure/infrastructure.service';

@Component({
  selector: 'app-list-floors',
  templateUrl: './list-floors.component.html',
  styleUrls: ['./list-floors.component.css']
})
export class ListFloorsComponent implements OnInit {

  floors = [];

  constructor(private _infrastructureService: InfrastructureService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._infrastructureService.listSections()
      .subscribe(
        (res: any) => {
          this.floors = res;
          console.log(res);
        }
      );
  }

  deleteSection(section) {
    swal({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado la sección, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this._infrastructureService.deleteSection(section)
          .subscribe(res => {
              console.log(res);
              this.loadData();
              swal('Sección eliminada con exito', 'Sección agregada con exito', 'success');
            },
            () => swal('Algo malo ha ocurrido', 'Error al agregar vacuna', 'error')
          );
      }
    });
  }

}
