import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {NurseService} from '../../../services/nurse/nurse.service';

@Component({
  selector: 'app-add-nurses',
  templateUrl: './add-nurses.component.html',
  styleUrls: ['./add-nurses.component.css']
})
export class AddNursesComponent implements OnInit {
  form: FormGroup;

  constructor(public _nurseService: NurseService) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellidos': new FormControl(),
      'Fecha_nacimiento': new FormControl(),
      'Edad': new FormControl(),
      'Sexo': new FormControl(),
      'Telefono': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
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
    this._nurseService.postNurse(this.form.value)
      .subscribe(
        res => {
          swal('Enfermera agregada', 'Enfermera agregada con exito', 'success');
          this.resetForm();
          console.log(res);
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error al agregar enfermera', 'error');
          console.log(error1);
        }
      );
  }

}
