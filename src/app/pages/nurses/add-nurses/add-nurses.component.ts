import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {NurseService} from '../../../services/nurse/nurse.service';

@Component({
  selector: 'app-add-nurses',
  templateUrl: './add-nurses.component.html',
  styleUrls: ['./add-nurses.component.css']
})
export class AddNursesComponent implements OnInit {
  form: FormGroup;

  constructor( public _nurseService: NurseService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellido': new FormControl(),
      'Edad': new FormControl(),
      'Sexo': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
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
    this._nurseService.postNurse(this.form.value)
      .subscribe(
        res => {
          console.log(res);
        }
      );
  }

}
