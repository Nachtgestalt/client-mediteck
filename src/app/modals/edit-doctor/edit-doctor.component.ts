import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {DoctorService} from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})
export class EditDoctorComponent implements OnInit {
  @Output() cerrado = new EventEmitter;
  @Input() doctor: any;

  form: FormGroup;
  private modalRef: NgbModalRef;
  closeResult: string;

  constructor( private modalService: NgbModal,
               public _doctorService: DoctorService) { }

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
      'InfoApp': new FormControl(null),
      'Estado': new FormControl(),
      // 'email': new FormControl(),
      // 'password': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  loadData2Form(doctor) {
    console.log(this.doctor);
    this.form.controls['Nombre'].setValue(doctor.Nombre);
    this.form.controls['Apellidos'].setValue(doctor.Apellidos);
    this.form.controls['Especialidad'].setValue(doctor.Especialidad);
    this.form.controls['Sexo'].setValue(doctor.Sexo);
    this.form.controls['Fecha_nacimiento'].setValue(doctor.Fecha_nacimiento);
    this.form.controls['Cedula'].setValue(doctor.Cedula);
    this.form.controls['Direccion'].setValue(doctor.Direccion);
    this.form.controls['Telefono'].setValue(doctor.Telefono);
    this.form.controls['Estado'].setValue(doctor.Estado);
  }

  open(content) {
    // console.log(this.centroMedico);
    this.loadData2Form(this.doctor);
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if ( result === 1) {
        swal('Doctor actualizado', 'Doctor actualizado con exito', 'success');
        this.cerrado.emit(true);
      } else if ( result === 2 ) {
        swal('Algo malo ha ocurrido', 'Error al actualizar doctor', 'error');
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
    this._doctorService.putDoctor(this.doctor.id, this.form.value)
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
