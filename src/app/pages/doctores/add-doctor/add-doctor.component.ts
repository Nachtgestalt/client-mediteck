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
      'Nombre': new FormControl(),
      'Apellidos': new FormControl(),
      'Especialidad': new FormControl(),
      'Sexo': new FormControl(),
      'Fecha_nacimiento': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
      'Telefono': new FormControl(),
      'Email': new FormControl(),
      'Password': new FormControl(),
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
          swal('Doctor agregado', 'Doctor agregado con exito', 'success');
          console.log(res);
          this.resetForm();
        },
         error1 => {
           swal('Algo malo ha ocurrido', 'Error al agregar doctor', 'error');
           console.log(error1);
         }
      );
  }

}
