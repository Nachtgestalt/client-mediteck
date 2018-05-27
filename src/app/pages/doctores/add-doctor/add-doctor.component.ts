import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  form: FormGroup;

  constructor() {
    this.createFormGrouo();
  }

  ngOnInit() {
  }

  createFormGrouo() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellidos': new FormControl(),
      'Especialidad': new FormControl(),
      'Sexo': new FormControl(),
      'Edad': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
    });
  }

  resetForm() {
    this.form.reset();
  }

}
