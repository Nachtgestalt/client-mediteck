import { Component, OnInit } from '@angular/core';
import {WarehouseService} from '../../services/warehouse/warehouse.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  warehouses = [];

  constructor( public _warehouseService: WarehouseService) { }

  ngOnInit() {
    this._warehouseService.getWarehouses()
      .subscribe(
        (res: any) => {
          this.warehouses = res;
          console.log(res);
        }
      );
  }

}
