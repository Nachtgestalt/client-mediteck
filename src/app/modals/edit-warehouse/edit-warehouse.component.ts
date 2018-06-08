import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {WarehouseService} from '../../services/warehouse/warehouse.service';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrls: ['./edit-warehouse.component.css']
})
export class EditWarehouseComponent implements OnInit {

  @Output() cerrado = new EventEmitter;
  @Input() warehouse: any;

  form: FormGroup;
  private modalRef: NgbModalRef;
  closeResult: string;

  constructor( private modalService: NgbModal,
               public _warehouseService: WarehouseService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      'Nombre': new FormControl(),
      'Direccion': new FormControl(),
      'Descricion': new FormControl(),
      'idCentro_medico': new FormControl(localStorage.getItem('idMedicalCenter'))
    });
  }

  loadData2Form(warehouse) {
    console.log(this.warehouse);
    this.form.controls['Nombre'].setValue(warehouse.Nombre);
    this.form.controls['Descricion'].setValue(warehouse.Descricion);
    this.form.controls['Direccion'].setValue(warehouse.Direccion);
  }


  open(content) {
    console.log(this.warehouse);
    this.loadData2Form(this.warehouse);
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
    this._warehouseService.putWarehouse(this.warehouse.id, this.form.value)
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
