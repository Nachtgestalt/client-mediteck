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
      'Nombre': new FormControl('Jonas'),
      'Apellidos': new FormControl('Brothers'),
      'Telefono': new FormControl('2345678'),
      'Sexo': new FormControl(),
      'Edad': new FormControl('23'),
      'Direccion': new FormControl('Avenida de las torres 23'),
      'Tipo_sangre': new FormControl('O+'),
      'Fecha_inscripcion': new FormControl('2018-06-06'),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter')),
      'email': new FormControl('jonas@outlook.com'),
      'password': new FormControl('secreet'),
    })
  }

  resetForm() {
    this.form.reset();
  }

  confirm() {
    console.log(this.form.value);
    this._patientService.postPatient(this.form.value)
      .subscribe(
        res => {
          console.log(res);
        }
      );

  }

}
