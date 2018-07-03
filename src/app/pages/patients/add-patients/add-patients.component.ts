import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PatientService} from '../../../services/patient/patient.service';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.component.html',
  styleUrls: ['./add-patients.component.css']
})
export class AddPatientsComponent implements OnInit {
  form: FormGroup;

  constructor( public _patientService: PatientService) { }

  ngOnInit() {
    this.createFormGroup();

  }

  createFormGroup() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellidos': new FormControl(),
      'Telefono': new FormControl(),
      'Sexo': new FormControl(),
      'Edad': new FormControl(),
      'Direccion': new FormControl(),
      'Tipo_sangre': new FormControl(),
      'Fecha_inscripcion': new FormControl(),
      'Estado_civil': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter')),
      'Email': new FormControl(),
      'Password': new FormControl(),
    });
  }

  resetForm() {
    this.form.reset();
  }

  confirm() {
    console.log(this.form.value);
    this._patientService.postPatient(this.form.value)
      .subscribe(
        res => {
          swal('Paciente agregado', 'Paciente agregado con exito', 'success');
          this.resetForm();
          console.log(res);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error al agregar paciente', 'error');
          console.log(error1);
        }
      );

  }

}
