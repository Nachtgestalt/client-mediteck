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

  formNotas: FormGroup;

  constructor( public _vaccineService: VaccineService,
               private modalService: NgbModal ) { }

  ngOnInit() {
    this.createForm();

  }

  createForm() {
    this.formNotas = new FormGroup({
      'Tipo_nota': new FormControl(''),
      'Diagnostico': new FormControl(''),
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
      'Pronostico': new FormControl('')
    });
  }

  // loadData2Form(vaccine) {
  //   this.form.controls['Nombre'].setValue(vaccine.Nombre);
  //   this.form.controls['Edad_aplicar'].setValue(vaccine.Edad_aplicar);
  //   this.form.controls['Costo'].setValue(vaccine.Costo);
  // }

  resetForm() {
    this.formNotas.reset();
  }

  confirm() {
    console.log(this.formNotas.value);
    // this._vaccineService.postVaccine(this.form.value)
    //   .subscribe(
    //     res => {
    //       this.modalRef.close(1);
    //       console.log(res);
    //     },
    //     error1 => {
    //       this.modalRef.close(2);
    //
    //       console.log(error1);
    //     }
    //   );
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
