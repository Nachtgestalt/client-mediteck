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
      'Nombre': new FormControl('Luis'),
      'Apellidos': new FormControl('Osorio'),
      'Especialidad': new FormControl('Proctologo'),
      'Sexo': new FormControl('0'),
      'Edad': new FormControl('26'),
      'Cedula': new FormControl('luis123'),
      'Direccion': new FormControl('calle siempreviva 46'),
      'email': new FormControl(),
      'password': new FormControl('secret'),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  loadData2Form(doctor) {
    console.log(this.doctor);
    this.form.controls['Nombre'].setValue(doctor.Nombre);
    this.form.controls['Apellidos'].setValue(doctor.Apellidos);
    this.form.controls['Especialidad'].setValue(doctor.Especialidad);
    this.form.controls['Sexo'].setValue(doctor.Sexo);
    this.form.controls['Edad'].setValue(doctor.Edad);
    this.form.controls['Cedula'].setValue(doctor.Cedula);
    this.form.controls['Direccion'].setValue(doctor.Direccion);
  }

  open(content) {
    // console.log(this.centroMedico);
    this.loadData2Form(this.doctor);
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if ( result ) {
        this.cerrado.emit(true);
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
    this.modalRef.close(false);
  }

  confirm() {
    console.log(this.form.value);
    this._doctorService.putDoctor(this.doctor.id, this.form.value)
      .subscribe(
        res => {
          this.modalRef.close(true);
          console.log(res);
        }
      );
  }
}
