import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConsultationService} from '../../../services/consultation/consultation.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {AutocompleteDataService} from '../../../services/autocompleteData/autocomplete-data.service';
import {UtilsService} from '../../../services/utils/utils.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  filteredOptionsDiagnostics: Observable<any[]>;
  filteredOptionsMedicine: Observable<any[]>[] = [];
  filteredOptionsLaboratory: Observable<any[]>[] = [];

  doctor = JSON.parse(localStorage.getItem('user'));
  form: FormGroup;
  formReceta: FormGroup;
  formNotas: FormGroup;
  formVacunas: FormGroup;
  formIndicaciones: FormGroup;
  formEstudios: FormGroup;

  patientAge = 0;

  patient: any;
  id;
  consultations: any;
  laboratories = [];

  showConsultationDetail = false;

  constructor(private _patientService: PatientService,
              private _autocompleteDataService: AutocompleteDataService,
              private _utilsService: UtilsService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cdref: ChangeDetectorRef,
              private _consultationService: ConsultationService,
              private domSanitizer: DomSanitizer) {
    this.route.data
      .subscribe(data => {
        console.log(data);
        this.patient = data.patient;
        this.consultations = data.consultations;
        // this.loadData(this.id);
      });

    this._autocompleteDataService.getLaboratorys()
      .subscribe((res: any) => {
        this.laboratories = res;
        console.log('Laboratorios', res);
      });
  }

  ngOnInit() {
    this.patientAge = this._utilsService.getAgeOnlyYear(this.patient.Fecha_nacimiento);
    console.log('Edad del paciente: ', this.patientAge);
    this.createFormGroup();

    this.filteredOptionsLaboratory[0] = this.formEstudios.get('Laboratorios.0').get('Tipo_estudio').valueChanges
      .pipe(
        startWith<any>(''),
        map(value => {
          console.log(value);
          return typeof value === 'string' ? value : value.Labororatorios;
        }),
        map(folio => folio ? this.filterLaboratories(folio) : this.laboratories.slice())
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

    if (this.patientAge <= 5) {
      this.form.addControl('AntecedentesPerinatales', new FormGroup({
        'ProductoGesta': new FormControl(),
        'TipoNacimiento': new FormControl(),
        'CalificacionApgar': new FormControl(),
        'GestacionNacimiento': new FormControl(),
        'TiempoLactancia': new FormControl(),
        'EdadAblactacion': new FormControl(),
      }));
    }

    if (this.patient.Sexo === 'FEMENINO' && (this.patientAge >= 15 && this.patientAge <= 90)) {
      this.form.addControl('AntecedentesGinecologicos', new FormGroup({
        'Menarca': new FormControl(),
        'FUM': new FormControl(),
        'Gestaciones': new FormControl(false),
        'Menopausia': new FormControl(false)
      }));
    }
  }

  createFormGroup() {
    this.form = new FormGroup({
      'id': new FormControl(),
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
      'FR': new FormControl(''),
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
      'Laboratorios': new FormArray([this.createItemLaboratorie()])
    });

  }

  setData2Form(consultation) {
    this.createFormGroup();
    const medicines = this.formReceta.get('Medicamentos') as FormArray;
    while (medicines.length) {
      medicines.removeAt(0);
    }
    for (let i = 0; i < consultation.receta.Medicamentos.length; i++) {
      this.addNewMedicine();
    }
    const laboratories = this.formEstudios.get('Laboratorios') as FormArray;
    while (laboratories.length) {
      laboratories.removeAt(0);
    }
    for (let i = 0; i < consultation.estudios.Laboratorios.length; i++) {
      this.addNewLaboratorie();
    }

    console.log(consultation);
    this.showConsultationDetail = true;
    this.form.patchValue(consultation.consulta);
    this.formNotas.patchValue(consultation.nota);
    this.formReceta.patchValue(consultation.receta);
    this.formEstudios.patchValue(consultation.estudios);
    this.formVacunas.patchValue(consultation.vacunas);
  }

  printFile(type: string) {
    let pdfResult;
    const newConsult = {
      'consulta': this.form.value,
      'receta': this.formReceta.value,
      'vacunas': this.formVacunas.value,
      'nota': this.formNotas.value,
      'estudios': this.formEstudios.value
    };

    this._consultationService.printFile(newConsult, type)
      .subscribe(
        res => {
          console.log(res);
          pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(res)
          );
          window.open(pdfResult.changingThisBreaksApplicationSecurity);
        }
      );
  }

  reload(cerrado) {
    console.log('Reload -> ', cerrado);
    if (cerrado) {
      this.loadData(this.patient.id);
    }
  }

  loadData(id) {
    this._patientService.getPatient(id)
      .subscribe(
        res => {
          this.patient = res;
          console.log(res);
        }
      );
    // this._consultationService.getConsultation(this.id)
    //   .subscribe(
    //     consultation => {
    //       this.consultations = consultation;
    //       console.log(this.consultations);
    //     }
    //   );
  }

  delete(id) {
    swal({
      title: '¿Estas seguro?',
      text: 'Una vez eliminado el paciente, no hay vuelta atras',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      },
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          this._patientService.deletePatient(id)
            .subscribe(
              res => {
                swal('Paciente eliminado exitosamente', {
                  icon: 'success',
                });
                this.router.navigate(['/listar_pacientes']);
              },
              error => {
                swal('Algo salio mal', 'No se pudo eliminar este paciente', {
                  icon: 'error',
                });
              }
            );
        }
      });
  }

  printRecipe() {
    let pdfResult;
    const id = this.form.get('id').value;
    this._consultationService.getRecipe(id)
      .subscribe(
      res => {
        pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(res)
        );
        window.open(pdfResult.changingThisBreaksApplicationSecurity);
      }
    );
  }

  createItemMedicine(medicamentos?): FormGroup {
    console.log(medicamentos);
    return this.formBuilder.group({
      Medicamento: ['', Validators.required],
      Cantidad: ['', Validators.required],
      Tiempo: ['', Validators.required],
      Prescripcion: ['', Validators.required],
    });
  }

  createItemLaboratorie(): FormGroup {
    return this.formBuilder.group({
      'Fecha': new FormControl(''),
      'Tipo_estudio': new FormControl(''),
      'Descripcion': new FormControl('')
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

  addNewLaboratorie() {
    const control = <FormArray>this.formEstudios.controls['Laboratorios'];
    control.push(this.createItemLaboratorie());

    this.filteredOptionsLaboratory[control.length - 1] = this.formEstudios.get(`Laboratorios.${control.length - 1}`).get('Tipo_estudio').valueChanges
      .pipe(
        startWith<any>(''),
        map(value => {
          console.log(value);
          return typeof value === 'string' ? value : value.Labororatorios;
        }),
        map(folio => folio ? this.filterLaboratories(folio) : this.laboratories.slice())
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

  deleteLaboratorie(index) {
    // control refers to your formarray
    const control = <FormArray>this.formEstudios.controls['Laboratorios'];
    // remove the chosen row
    control.removeAt(index);
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

  filterLaboratories(val: string) {
    // call the service which makes the http-request
    return this.laboratories.filter(option => {
      return option.Labororatorios.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

}
