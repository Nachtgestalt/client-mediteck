import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {NurseService} from '../../services/nurse/nurse.service';

@Component({
  selector: 'app-edit-nurse',
  templateUrl: './edit-nurse.component.html',
  styleUrls: ['./edit-nurse.component.css']
})
export class EditNurseComponent implements OnInit {
  @Output() cerrado = new EventEmitter;
  @Input() nurse: any;

  form: FormGroup;
  private modalRef: NgbModalRef;
  closeResult: string;

  constructor( private modalService: NgbModal,
               public _nurseService: NurseService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Apellido': new FormControl(),
      'Fecha_nacimiento': new FormControl(),
      'Sexo': new FormControl(),
      'Cedula': new FormControl(),
      'Direccion': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  loadData2Form(nurse) {
    console.log(this.nurse);
    this.form.controls['Nombre'].setValue(nurse.Nombre);
    this.form.controls['Apellido'].setValue(nurse.Apellidos);
    this.form.controls['Sexo'].setValue(nurse.Sexo);
    this.form.controls['Fecha_nacimiento'].setValue(nurse.Fecha_nacimiento);
    this.form.controls['Cedula'].setValue(nurse.Cedula);
    this.form.controls['Direccion'].setValue(nurse.Direccion);
  }


  open(content) {
    // console.log(this.centroMedico);
    this.loadData2Form(this.nurse);
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if ( result === 1 ) {
        swal('Enfermera actualizada', 'Enfermera actualizada con exito', 'success');
        this.cerrado.emit(true);
      } else if (result === 2) {
        swal('Algo malo ha ocurrido', 'Error al actualizar enfermera', 'error');
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
    this._nurseService.putNurse(this.nurse.id, this.form.value)
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
