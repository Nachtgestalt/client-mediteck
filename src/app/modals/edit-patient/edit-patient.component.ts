import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PatientService} from '../../services/patient/patient.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {

  @Output() cerrado = new EventEmitter;
  @Input() patient: any;

  form: FormGroup;
  private modalRef: NgbModalRef;
  closeResult: string;

  civilStatus = [
    {value: 2, viewValue: 'SOLTERO'},
    {value: 1, viewValue: 'CASADO'},
    {value: 3, viewValue: 'DIVORCIADO'},
    {value: 4, viewValue: 'VIUDO'}
  ];

  constructor( private modalService: NgbModal,
               public _patientService: PatientService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellidos': new FormControl(),
      'Telefono': new FormControl(),
      'Celular': new FormControl(),
      'Sexo': new FormControl(),
      'Fecha_nacimiento': new FormControl(),
      'Direccion': new FormControl(),
      'Tipo_sangre': new FormControl(),
      'Fecha_inscripcion': new FormControl(),
      'Estado_civil': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter')),
    });
  }

  loadData2Form(patient) {
    console.log(this.patient);
    this.form.controls['Nombre'].setValue(patient.Nombre);
    this.form.controls['Apellidos'].setValue(patient.Apellidos);
    this.form.controls['Telefono'].setValue(patient.Telefono);
    this.form.controls['Celular'].setValue(patient.Celular);
    this.form.controls['Sexo'].setValue(patient.Sexo);
    this.form.controls['Fecha_nacimiento'].setValue(patient.Fecha_nacimiento);
    this.form.controls['Direccion'].setValue(patient.Direccion);
    this.form.controls['Tipo_sangre'].setValue(patient.Tipo_sangre);
    this.form.controls['Estado_civil'].setValue(patient.Estado_civil);

  }


  open(content) {
    // console.log(this.centroMedico);
    this.loadData2Form(this.patient);
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if ( result === 1 ) {
        swal('Paciente actualizado', 'Paciente actualizado con exito', 'success');
        this.cerrado.emit(true);
      } else if (result === 2) {
        swal('Algo malo ha ocurrido', 'Error al actualizar paciente', 'error');
      }
      console.log(result);
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  cancelModal() {
    this.modalRef.close(3);
  }

  confirm() {
    console.log(this.form.value);
    this._patientService.putPatient(this.patient.id, this.form.value)
      .subscribe(
        res => {
          this.modalRef.close(1);
          console.log(res);
        },
        error1 => {
          this.modalRef.close(2);
        }
      );
  }
}
