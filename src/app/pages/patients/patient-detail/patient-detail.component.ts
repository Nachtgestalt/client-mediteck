import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient/patient.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConsultationService} from '../../../services/consultation/consultation.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/index';
import {AutocompleteDataService} from '../../../services/autocompleteData/autocomplete-data.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  filteredOptionsDiagnostics: Observable<any[]>;
  filteredOptionsMedicine: Observable<any[]>[] = [];

  doctor = JSON.parse(localStorage.getItem('user'));
  form: FormGroup;
  formReceta: FormGroup;
  formNotas: FormGroup;
  formVacunas: FormGroup;
  formIndicaciones: FormGroup;
  formEstudios: FormGroup;

  patient: any;
  id;
  consultations: any;

  showConsultationDetail = false;

  constructor(private _patientService: PatientService,
              private _autocompleteDataService: AutocompleteDataService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private cdref: ChangeDetectorRef,
              private _consultationService: ConsultationService) {
    this.route.data
      .subscribe(data => {
        console.log(data);
        this.patient = data.patient;
        this.consultations = data.consultations;
        // this.loadData(this.id);
      });
  }

  ngOnInit() {
    this.createFormGroup();
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

  setData2Form(consultation) {
    // const medicines = this.formReceta.get('Medicamentos') as FormArray;
    console.log(consultation.receta.Medicamentos.length);
    for (let i = 0; i < consultation.receta.Medicamentos.length - 1; i++) {
      this.addNewMedicine();
    }
    // while (consultation.receta.Medicamentos.length) {
    //   this.createItemMedicine();
    // }
    console.log(consultation);
    this.showConsultationDetail = true;
    this.form.setValue(consultation.consulta);
    this.formNotas.setValue(consultation.nota);
    this.formReceta.patchValue(consultation.receta);
    this.formEstudios.patchValue(consultation.estudios);
    console.log('consultation.consulta: ', consultation.consulta);
    console.log('Form consulta: ', this.form.value);
  }

  reload(cerrado) {
    if (cerrado) {
      this.loadData(this.id);
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
                this.router.navigate(['/listar_pacientes'])
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

  createItemMedicine(medicamentos?): FormGroup {
    console.log(medicamentos);
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

}
