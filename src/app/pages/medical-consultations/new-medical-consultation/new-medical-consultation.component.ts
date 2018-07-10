import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VaccineService} from '../../../services/vaccine/vaccine.service';
import {PatientService} from '../../../services/patient/patient.service';
import {ConsultationService} from '../../../services/consultation/consultation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../services/question/question.service';

@Component({
  selector: 'app-new-medical-consultation',
  templateUrl: './new-medical-consultation.component.html',
  styleUrls: ['./new-medical-consultation.component.css']
})
export class NewMedicalConsultationComponent implements OnInit {
  questions: any[];


  form: FormGroup;
  formReceta: FormGroup;
  formNotas: FormGroup;
  formVacunas: FormGroup;
  formIndicaciones: FormGroup;
  formEstudios: FormGroup;

  vaccines = [];
  patient: any;

  doctor = JSON.parse(localStorage.getItem('user'));

  patientSelected = new FormControl();

  constructor(public _vaccineService: VaccineService,
              public _patientService: PatientService,
              private _consultationService: ConsultationService,
              private questionService: QuestionService,
              private formBuilder: FormBuilder,
              private cdref: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
    this.questions = questionService.getQuestions();
    let id;
    this.route.params
      .subscribe(parametros => {
        id = parametros['id'];
        this._patientService.getPatient(id)
          .subscribe(
            res => {
              this.patient = res;
              console.log(res);
            }
          );
      });

  }

  ngOnInit() {
    this.createFormGroup();
    this._vaccineService.getVaccines()
      .subscribe(
        (res: any) => {
          this.vaccines = res;
        }
      );
  }

  createFormGroup() {
    this.form = new FormGroup({
      'idCentro_medico': new FormControl(Number(localStorage.getItem('idMedicalCenter'))),
      'idMedico': new FormControl(this.doctor.id),
      'idPaciente': new FormControl(),
      'Fecha': new FormControl(''),
      'Peso': new FormControl(''),
      'Talla': new FormControl(''),
      'Perimetro_cefalitico': new FormControl(''),
      'Perimetro_Torasico': new FormControl(''),
      'Costo': new FormControl('')
    });

    this.formReceta = new FormGroup({
      'Titulo': new FormControl('', Validators.required),
      'Medicamentos': new FormArray([this.createItemMedicine()])
    });

    this.formIndicaciones = new FormGroup({
      'Dieta': new FormControl('', Validators.required),
      'Esquema_soluciones': new FormControl(''),
      'Lista_medicamentos': new FormControl(''),
      'Medias_generales': new FormControl(''),
      'Hemocomponentes': new FormControl(''),
    });

    this.formNotas = new FormGroup({
      'Tipo_nota': new FormControl(''),
      'Diagnostico': new FormControl(''),
      'Peso': new FormControl(''),
      'Talla': new FormControl(''),
      'IMC': new FormControl(''),
      'FC': new FormControl(''),
      'TR': new FormControl(''),
      'SVT': new FormControl(''),
      'Temperatura': new FormControl(''),
      'TA': new FormControl(''),
      'SO2': new FormControl(''),
      'Nota': new FormControl(''),
      'Pronostico': new FormControl('')
    });

    this.formVacunas = new FormGroup({
      'Fecha_aplicacion': new FormControl(''),
      'idVacuna': new FormControl('')
    });

    this.formEstudios = new FormGroup({
      'Fecha': new FormControl(''),
      'Tipo_estudio': new FormControl(''),
      'Descripcion': new FormControl('')
    });
  }


  save() {
    console.log(this.patientSelected.value);
    this.form.get('idPaciente').setValue(Number(this.patientSelected.value));
    let newConsult = {
      'consulta': this.form.value,
      'receta': this.formReceta.value,
      'indicaciones': this.formIndicaciones.value,
      'vacunas': this.formVacunas.value,
      'nota': this.formNotas.value,
      'estudios': this.formEstudios.value
    };

    console.log(JSON.stringify(newConsult));

    // this._consultationService.postConsultation(newConsult)
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     }
    //   );

  }

  createItemMedicine(): FormGroup {
    return this.formBuilder.group({
      Medicina: ['', Validators.required],
      Prescripcion: ['', Validators.required],
    });
  }

  addNewMedicine() {
    const control = <FormArray>this.formReceta.controls['Medicamentos'];
    control.push(this.createItemMedicine());
    this.cdref.detectChanges();
  }

  deleteMedicine(index) {
    // control refers to your formarray
    const control = <FormArray>this.formReceta.controls['Medicamentos'];
    // remove the chosen row
    control.removeAt(index);
  }


}
