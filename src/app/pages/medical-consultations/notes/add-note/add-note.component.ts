import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VaccineService} from '../../../../services/vaccine/vaccine.service';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  @Output() cerrado = new EventEmitter;

  private modalRef: NgbModalRef;
  closeResult: string;

  form: FormGroup;

  constructor( public _vaccineService: VaccineService,
               private modalService: NgbModal ) { }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Edad_aplicar': new FormControl(),
      'Costo': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  loadData2Form(vaccine) {
    this.form.controls['Nombre'].setValue(vaccine.Nombre);
    this.form.controls['Edad_aplicar'].setValue(vaccine.Edad_aplicar);
    this.form.controls['Costo'].setValue(vaccine.Costo);
  }

  resetForm() {
    this.form.reset();
  }

  confirm() {
    console.log(this.form.value);
    this._vaccineService.postVaccine(this.form.value)
      .subscribe(
        res => {
          this.modalRef.close(1);
          console.log(res);
        },
        error1 => {
          this.modalRef.close(2);

          console.log(error1);
        }
      );
  }

  open(content) {
    // this.loadData2Form(this.vaccine);
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
      if ( result === 1 ) {
        swal('Vacuna agregada', 'Vacuna agregada con exito', 'success');
        this.cerrado.emit(true);
      } else if (result === 2) {
        swal('Algo malo ha ocurrido', 'Error al agregar vacuna', 'error');
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
}
