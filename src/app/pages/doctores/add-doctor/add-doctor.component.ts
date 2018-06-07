import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DoctorService} from '../../../services/doctor/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  form: FormGroup;

  constructor( public _doctorService: DoctorService) {
    this.createFormGrouo();
  }

  ngOnInit() {
  }

  createFormGrouo() {
    this.form = new FormGroup({
      'Nombre': new FormControl('Luis'),
      'Apellidos': new FormControl('Osorio'),
      'Especialidad': new FormControl('Proctologo'),
      'Sexo': new FormControl('Masculino'),
      'Edad': new FormControl('26'),
      'Cedula': new FormControl('luis123'),
      'Direccion': new FormControl('calle siempreviva 46'),
      'email': new FormControl(),
      'password': new FormControl('secret'),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  resetForm() {
    this.form.reset();
  }

  confirm() {
    console.log(this.form.value);
    this._doctorService.postDoctor(this.form.value)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

}
