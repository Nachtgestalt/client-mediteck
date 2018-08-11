import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VaccineService} from '../../../services/vaccine/vaccine.service';
import {PatientService} from '../../../services/patient/patient.service';
import {ConsultationService} from '../../../services/consultation/consultation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../services/question/question.service';
import {UtilsService} from '../../../services/utils/utils.service';
import {AutocompleteDataService} from '../../../services/autocompleteData/autocomplete-data.service';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {Observable, empty, of} from 'rxjs';
import {EMPTY} from 'rxjs/internal/observable/empty';
import {EmptyObservable} from 'rxjs-compat/observable/EmptyObservable';


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
  formEstudios: FormGroup;
  id = 0;

  filteredOptionsDiagnostics: Observable<any[]>;
  filteredOptionsMedicine: Observable<any[]>[] = [];

  vaccines = [];
  patient: any;

  doctor = JSON.parse(localStorage.getItem('user'));

  patientSelected = new FormControl();

  constructor(private _autocompleteDataService: AutocompleteDataService,
              public _vaccineService: VaccineService,
              public _patientService: PatientService,
              private _consultationService: ConsultationService,
              private formBuilder: FormBuilder,
              private cdref: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.data
      .subscribe(data => {
        this.patient = data.patient;
      });
  }

  ngOnInit() {
    this.createFormGroup();
    console.log('Paciente: ', this.patient);

    this._vaccineService.getVaccines()
      .subscribe(
        (res: any) => {
          this.vaccines = res;
        }
      );

    this.filteredOptionsMedicine[0] = this.formReceta.get('Medicamentos.0').get('Medicamento').valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value: any) => {
          console.log(value);
          // value ? this.filter(value || '') : new EmptyObservable();
          return this.filterMedicine(value || '');
        })
      );

    this.filteredOptionsDiagnostics = this.formNotas.get('Diagnostico').valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value: any) => {
          console.log(value);
          // value ? this.filter(value || '') : new EmptyObservable();
          return this.filter(value || ' ');
        })
      );
  }

  createFormGroup() {
    this.form = new FormGroup({
      'idCentro_medico': new FormControl(Number(localStorage.getItem('idMedicalCenter'))),
      'idMedico': new FormControl(this.doctor.id),
      'idPaciente': new FormControl(this.patient.id),
      'Fecha': new FormControl(),
      'MotivoConsulta': new FormControl(''),
      'EnfermedadActual': new FormControl(),
      'Alergia': new FormGroup({
        'Estado': new FormControl(false),
        'Descripcion': new FormControl()
      }),
      'Costo': new FormControl('')
    });

    this.formReceta = new FormGroup({
      'Titulo': new FormControl('', Validators.required),
      'Medicamentos': new FormArray([this.createItemMedicine()])
    });


    this.formNotas = new FormGroup({
      'MotivoConsulta': new FormControl(''),
      'Diagnostico': new FormControl(),
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
      'Pronostico': new FormControl(''),
      'Plan': new FormControl(''),
      'ExploracionFisica': new FormControl('')
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
    // this.form.get('idPaciente').setValue(Number(this.patientSelected.value));
    const newConsult = {
      'consulta': this.form.value,
      'receta': this.formReceta.value,
      'vacunas': this.formVacunas.value,
      'nota': this.formNotas.value,
      'estudios': this.formEstudios.value
    };

    console.log(JSON.stringify(newConsult));

    this._consultationService.postConsultation(newConsult)
      .subscribe(
        res => {
          console.log(res);
          swal('Consulta realizada', 'Consulta realizada con exito', 'success');
          this.router.navigate(['listar_pacientes'])
        }
      );

  }

  createItemMedicine(): FormGroup {
    return this.formBuilder.group({
      Medicamento: ['', Validators.required],
      Cantidad: ['', Validators.required],
      Tiempo: ['', Validators.required],
      Prescripcion: ['', Validators.required],
    });
  }

  addNewMedicine() {
    const control = <FormArray>this.formReceta.controls['Medicamentos'];
    control.push(this.createItemMedicine());

    this.filteredOptionsMedicine[control.length - 1] = this.formReceta.get(`Medicamentos.${control.length - 1}`).get('Medicamento').valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value: any) => {
          console.log(value);
          // value ? this.filter(value || '') : new EmptyObservable();
          return this.filterMedicine(value || ' ');
        })
      );
    this.cdref.detectChanges();
  }

  deleteMedicine(index) {
    // control refers to your formarray
    const control = <FormArray>this.formReceta.controls['Medicamentos'];
    // remove the chosen row
    control.removeAt(index);
  }

  filter(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this._autocompleteDataService.getDiagnostics(val)
      .pipe(
        map((response: any) => response.filter(option => {
          return option.Enfermedades.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        }))
      );
  }


  filterMedicine(val: string): Observable<any[]> {
    // call the service which makes the http-request
    return this._autocompleteDataService.getMedicines(val)
      .pipe(
        map((response: any) => response.filter(option => {
          return option.Compuesto.toLowerCase().indexOf(val.toLowerCase()) >= 0;
        }))
      );
  }

  displayMedicineFn(medicine?: any): string | undefined {
    return medicine ? medicine.Compuesto : undefined;
  }


}
