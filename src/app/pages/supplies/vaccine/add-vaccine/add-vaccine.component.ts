import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {VaccineService} from '../../../../services/vaccine/vaccine.service';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-vaccine',
  templateUrl: './add-vaccine.component.html',
  styleUrls: ['./add-vaccine.component.css']
})
export class AddVaccineComponent implements OnInit {

  @Input() vaccine: any;

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
