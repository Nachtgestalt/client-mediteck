import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import {InfrastructureService} from '../../../services/infrastructure/infrastructure.service';
import {error} from 'selenium-webdriver';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  form: FormGroup;
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private _infrastructureService: InfrastructureService) { }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = new FormGroup({
      'Seccion': new FormControl(),
      'Piso': new FormControl(),
    });
  }

  save() {
    let body = {
      idCentro_medico: this.user.idCentro_medico,
      Infrestructura_centro_medico: this.form.value
    };
    this._infrastructureService.createSection(body)
      .subscribe(
        res => {
          console.log(res);
          swal('Sección agregada', 'Sección agregada con exito', 'success');
          this.createFormGroup();
        },
        () => swal('Algo malo ha ocurrido', 'Error al agregar sección', 'error')
      );
  }

}
