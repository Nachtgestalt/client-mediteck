import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionBase} from '../../../models/question-base';
import {QuestionControlService} from '../../../services/question/question-control.service';
import {UtilsService} from '../../../services/utils/utils.service';
import {MedicalHistoryService} from '../../../services/medical-history/medical-history.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css']
})

export class MedicalHistoryComponent implements OnInit {
  @Input() patientData: any;
  form: FormGroup;
  payLoad;

  isCollapsedAntFam = true;
  isCollapsedAntPat = true;
  isCollapsedAntNoPat = true;
  isCollapsedIntApar = true;
  isCollapsedAntGinecologicos = true;
  isCollapsedAntPerinatales = true;
  isCollapsedCartilla = true;

  isEditMedicalHistory = true;
  msgEditMedical = 'Editar';

  patientAge = 0;
  medicalHistory: any;

  constructor(private _utilsService: UtilsService,
              private _medicalHistoryService: MedicalHistoryService) {
  }

  ngOnInit() {
    this.patientAge = this._utilsService.getAgeOnlyYear(this.patientData.Fecha_nacimiento);
    console.log('Edad del paciente: ', this.patientAge);
    console.log('Datos del paciente: ', this.patientData);
    console.log('Historia del paciente: ', this.medicalHistory);
    this.createFormGroup();
    this._medicalHistoryService.getMedicalHistory(this.patientData.id)
      .subscribe(
        (res: any) => {
          if ( res.length !== 0) {
            this.medicalHistory = res[0].HistoriaClinica;
            this.form.patchValue(this.medicalHistory);
            console.log('Historia del paciente: ', this.medicalHistory);
          }
        }
      );
  }

  createFormGroup() {
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
        'Fisica': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
      }),

      'InterrogatorioAparatos': new FormGroup({
        'Descripcion': new FormControl()
      })
    });

    if (this.patientAge <= 5) {
      this.form.addControl('AntecedentesPerinatales', new FormGroup({
        'ProductoGesta': new FormControl(),
        'TipoNacimiento': new FormControl(),
        'CalificacionApgar': new FormControl(),
        'GestacionNacimiento': new FormControl(),
        'TiempoLactancia': new FormControl(),
        'EdadAblactacion': new FormControl(),
      }));

      this.form.addControl('CartillaVacunacion', new FormGroup({
        'BCG': new FormGroup({
          'Unica': new FormControl()
        }),
        'HepatitisB': new FormGroup({
          'Primera': new FormControl(),
          'Segunda': new FormControl(),
          'Tercera': new FormControl()
        }),
        'Pentavalente': new FormGroup({
          'Primera': new FormControl(),
          'Segunda': new FormControl(),
          'Tercera': new FormControl(),
          'Cuarta': new FormControl()
        }),
        'DPT': new FormGroup({
          'Refuerzo': new FormControl()
        }),
        'Rotavirus': new FormGroup({
          'Primera': new FormControl(),
          'Segunda': new FormControl(),
          'Tercera': new FormControl()
        }),
        'Neumococo': new FormGroup({
          'Primera': new FormControl(),
          'Segunda': new FormControl(),
          'Refuerzo': new FormControl()
        }),
        'Influenza': new FormGroup({
          'Primera': new FormControl(),
          'Segunda': new FormControl(),
          'Revacunacion': new FormControl()
        }),
        'SRP': new FormGroup({
          'Primera': new FormControl(),
          'Refuerzo': new FormControl()
        }),
        'Sabin': new FormGroup({
          'Adicionales': new FormControl()
        }),
        'SR': new FormGroup({
          'Adicionales': new FormControl()
        }),
      }));
    }

    if (this.patientData.Sexo === 'FEMENINO' && (this.patientAge >= 15 && this.patientAge <= 90)) {
      this.form.addControl('AntecedentesGinecologicos', new FormGroup({
        'Menarca': new FormControl(),
        'FUM': new FormControl(),
        'Gestaciones': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        }),
        'Menopausia': new FormGroup({
          'Estado': new FormControl(false),
          'Descripcion': new FormControl()
        })
      }));
    }
  }

  editMedicalHistory() {
    this.isEditMedicalHistory = !this.isEditMedicalHistory;
    this.isEditMedicalHistory ? this.msgEditMedical = 'Editar' : this.msgEditMedical = 'Guardar';

    if (!this.isEditMedicalHistory) {
      this.isCollapsedAntFam = false;
      this.isCollapsedAntNoPat = false;
      this.isCollapsedAntPat = false;
      this.isCollapsedIntApar = false;
      this.isCollapsedAntGinecologicos = false;
      this.isCollapsedAntPerinatales = false;
      this.isCollapsedCartilla = false;
      console.log(this.patientData);
    } else {
      this.payLoad = {
        idUsuario: this.patientData.id,
        HistoriaClinica: this.form.value,
      };
      console.log(JSON.stringify(this.payLoad));
      this._medicalHistoryService.postMedicalHistory(this.payLoad)
        .subscribe(
          res => {
            console.log(res);
          }
        );
      this.isCollapsedAntFam = true;
      this.isCollapsedAntNoPat = true;
      this.isCollapsedAntPat = true;
      this.isCollapsedIntApar = true;
      this.isCollapsedAntGinecologicos = true;
      this.isCollapsedAntPerinatales = true;
      this.isCollapsedCartilla = true;
    }
  }
}
