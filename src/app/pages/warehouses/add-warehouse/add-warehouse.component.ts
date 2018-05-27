import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css']
})
export class AddWarehouseComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createFormGrouo();
  }

  createFormGrouo() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Direccion': new FormControl(),
      'Descricion': new FormControl(),
    });
  }

}
