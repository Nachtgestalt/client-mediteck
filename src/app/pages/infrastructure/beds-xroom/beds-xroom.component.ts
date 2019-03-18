import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {InfrastructureService} from '../../../services/infrastructure/infrastructure.service';

@Component({
  selector: 'app-beds-xroom',
  templateUrl: './beds-xroom.component.html',
  styleUrls: ['./beds-xroom.component.css']
})
export class BedsXroomComponent implements OnInit {

  form: FormGroup;
  sections = [];
  private medical_center = localStorage.getItem('idMedicalCenter');

  constructor(private _infrastructureService: InfrastructureService) {
  }

  ngOnInit() {
    this._infrastructureService.listSections()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.sections = res;
        });
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Piso': new FormControl(),
      'Seccion': new FormControl(),
      'Descripcion': new FormControl(),
    });
  }

  save() {
    const section = this.form.controls['Seccion'].value;
    const description = this.form.controls['Descripcion'].value;
    console.log(section);
    const payload = {
      Piso: section.Infrestructura_centro_medico.Piso,
      Seccion: section.Infrestructura_centro_medico.Seccion,
      idCentro_medico: this.medical_center,
      Ocupado: 0,
      Descripcion: description
    };
    this._infrastructureService.createBed(payload)
      .subscribe(
        res => {
          console.log(res);
          swal('Cama agregada', 'Cama agregada con exito', 'success');
          this.createForm();
        },
        () => swal('Algo malo ha ocurrido', 'Error al agregar cama', 'error')
      );
  }

}
