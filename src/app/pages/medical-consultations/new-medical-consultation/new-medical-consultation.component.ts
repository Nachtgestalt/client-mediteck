import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {VaccineService} from '../../../services/vaccine/vaccine.service';
import {PatientService} from '../../../services/patient/patient.service';

@Component({
  selector: 'app-new-medical-consultation',
  templateUrl: './new-medical-consultation.component.html',
  styleUrls: ['./new-medical-consultation.component.css']
})
export class NewMedicalConsultationComponent implements OnInit {

  form: FormGroup;
  formReceta: FormGroup;
  formNotas: FormGroup;
  formVacunas: FormGroup;
  formIndicaciones: FormGroup;

  vaccines = [];
  patients = [];

  doctor = JSON.parse(localStorage.getItem('user'));

  patientSelected = new FormControl();

  constructor( public _vaccineService: VaccineService,
               public _patientService: PatientService) { }

  ngOnInit() {
    this.createFormGroup();
    this._vaccineService.getVaccines()
      .subscribe(
        (res: any) => {
          this.vaccines = res;
        }
      );
    this._patientService.getPatients()
      .subscribe(
        (res: any) => {
          console.log(res);
          this.patients = res;
        }
      );
  }

  createFormGroup() {
    this.form = new FormGroup({
      'idCentro_medico': new FormControl(Number(localStorage.getItem('idMedicalCenter'))),
      'idMedico': new FormControl(this.doctor.id),
      'idPaciente': new FormControl(),
      'Fecha': new FormControl(),
      'Peso': new FormControl(),
      'Talla': new FormControl(),
      'Perimetro_cefalitico': new FormControl(),
      'Perimetro_Torasico': new FormControl(),
      'Costo': new FormControl()
    });

    this.formReceta = new FormGroup({
      'Titulo': new FormControl(),
      'Descripcion': new FormControl(),
      'Medicamentos': new FormControl()
    });

    this.formIndicaciones = new FormGroup({
      'Dieta': new FormControl(),
      'Esquema_soluciones': new FormControl(),
      'Lista_medicamentos': new FormControl(),
      'Medias_generales': new FormControl(),
      'Hemocomponentes': new FormControl(),
    });

    // this.formNotas = new FormGroup({
    //
    // });

    this.formVacunas = new FormGroup({
      'Fecha_aplicacion': new FormControl(),
      'idVacuna': new FormControl()
    });
  }


  save() {
    console.log(this.patientSelected.value);
    this.form.get('idPaciente').setValue(Number(this.patientSelected.value));
    let newConsult = {
      'consulta': this.form.value,
      'receta': this.formReceta.value,
      'indicaciones': this.formIndicaciones.value,
      'vacunas': this.formVacunas.value
    };


    console.log(JSON.stringify(newConsult));
  }
}
