import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-nurses',
  templateUrl: './add-nurses.component.html',
  styleUrls: ['./add-nurses.component.css']
})
export class AddNursesComponent implements OnInit {
  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Nombre_enf': new FormControl(),
      'Apellidos_enf': new FormControl(),
      'Edad': new FormControl(),
      'Sexo': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
    });
    
  }
}
