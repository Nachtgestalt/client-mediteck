import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  form: FormGroup;

  constructor() { 
    this.createFormGroup();
  }

  ngOnInit() {
  }

  createFormGroup() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Compuesto': new FormControl(),
      'Presentacion': new FormControl(),
      'Descripcion': new FormControl(),
      'Precio': new FormControl(),
      'Cantidad': new FormControl(),
      'Lote': new FormControl(),
      'Caducidad': new FormControl(),
      'Dosis': new FormControl(),
    });
  }

}
