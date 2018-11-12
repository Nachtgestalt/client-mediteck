import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DoctorService} from '../../../services/doctor/doctor.service';
import {Observable} from 'rxjs/index';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {AutocompleteDataService} from '../../../services/autocompleteData/autocomplete-data.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  form: FormGroup;
  filteredOptions: Observable<any>;
  specialitys: any;
  isData = false;

  constructor(public _doctorService: DoctorService,
              public _autocompleteDataService: AutocompleteDataService) {
    this._autocompleteDataService.getSpecialitys().subscribe(res => {
        console.log(res);
        this.specialitys = res;
        this.isData = true;
      }
    );
  }

  ngOnInit() {
    this.createFormGrouo();
  }

  createFormGrouo() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellidos': new FormControl(),
      'Especialidad': new FormControl(),
      'Sexo': new FormControl(),
      'Fecha_nacimiento': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
      'Telefono': new FormControl(),
      'Email': new FormControl(),
      'Password': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });

    this.filteredOptions = this.form.get('Especialidad').valueChanges
      .pipe(
        startWith<any>(''),
        map(value => {
          console.log(value);
          return typeof value === 'string' ? value : value.Especialidades;
        }),
        map(folio => folio ? this.filterSpeciality(folio) : this.specialitys.slice())
      );
  }

  resetForm() {
    this.form.reset();
  }

  confirm() {
    console.log(this.form.value);
    this._doctorService.postDoctor(this.form.value)
      .subscribe(
        res => {
          swal('Doctor agregado', 'Doctor agregado con exito', 'success');
          console.log(res);
          this.resetForm();
        },
        error1 => {
          swal('Algo malo ha ocurrido', 'Error al agregar doctor', 'error');
          console.log(error1);
        }
      );
  }

  filterSpeciality(val: string) {
    // call the service which makes the http-request
    return this.specialitys.filter(option => {
      return option.Especialidades.toLowerCase().indexOf(val.toLowerCase()) === 0;
    });
  }

  displayMedicineFn(speciality?: any): string | undefined {
    return speciality ? speciality.Especialidades : undefined;
  }

}
