import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {WarehouseService} from '../../../services/warehouse/warehouse.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {
  form: FormGroup;

  constructor( public _warehouseService: WarehouseService) { }

  ngOnInit() {
    this.createFormGrouo();
  }

  createFormGrouo() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Direccion': new FormControl(),
      'Descricion': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  resetForm() {
    this.form.reset();
  }

  confirm() {
    console.log(this.form.value);
    this._warehouseService.postWarehouse(this.form.value)
      .subscribe(
        res => {
          console.log(res);
        }
      );

  }

}
