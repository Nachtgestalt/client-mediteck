import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionBase} from '../../../models/question-base';
import {QuestionControlService} from '../../../services/question/question-control.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})
export class MedicalHistoryComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  isCollapsedAntFam = true;
  isCollapsedAntPat = true;
  isCollapsedAntNoPat = true;
  isCollapsedIntApar = true;

  isEditMedicalHistory = true;
  msgEditMedical = 'Editar';


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      'AntecedentesFamiliares': new FormGroup({
        'DiabetesMellitus': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Cancer': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Hipertension': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Reumatologicas': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Cardiovasculares': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Neurologicas': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Otras': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
      }),

      'AntecedentesPatologicos': new FormGroup({
        'IngestaFarmacos': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'UltimaHospitalizacion': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Transfusiones': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Cirugias': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
      }),
      'AntecedentesNoPatologicos': new FormGroup({
        'Tabaquismo': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Alcoholismo': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Toxicomanias': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Dieta': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'ActividadFisica': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
      }),
      'InterrogatorioAparatos': new FormGroup({
        'Descripcion': new FormControl()
      }),
    });
  }

  editMedicalHistory() {
    this.isEditMedicalHistory = !this.isEditMedicalHistory;
    this.isEditMedicalHistory ? this.msgEditMedical = 'Editar' : this.msgEditMedical = 'Guardar';

    if (!this.isEditMedicalHistory) {
      this.isCollapsedAntFam = false;
      this.isCollapsedAntNoPat = false;
      this.isCollapsedAntPat = false;
      this.isCollapsedIntApar = false;
    } else {
      this.payLoad = JSON.stringify(this.form.value);
      console.log(this.payLoad);
      this.isCollapsedAntFam = true;
      this.isCollapsedAntNoPat = true;
      this.isCollapsedAntPat = true;
      this.isCollapsedIntApar = true;
    }
  }
}
