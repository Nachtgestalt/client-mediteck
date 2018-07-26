import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../../services/warehouse/warehouse.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  queryString = '';
  searchableList: any;

  warehouses = [];

  constructor( public _warehouseService: WarehouseService,
               public router: Router) {
    this.searchableList = ['Nombre', 'Direccion'];
  }

  ngOnInit() {
   this.loadData();
  }

  loadData() {
    this._warehouseService.getWarehouses()
      .subscribe(
        (res: any) => {
          this.warehouses = res;
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
      text: 'Una vez eliminado el almacen, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._warehouseService.deleteWarehouse(id)
            .subscribe(
              res => {
                swal('Almacen eliminado exitosamente', {
                  icon: 'success',
                });
                this.reload(true);
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar este almacen', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }

}
