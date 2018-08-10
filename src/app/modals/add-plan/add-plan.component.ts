import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent implements OnInit {

  private modalRef: NgbModalRef;
  name:any;
  price:any;
  type:any;
  frecuency:any;

  constructor(private modalService: NgbModal, public http:HttpClient){ }

  open(content){
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit() {}

  update(){
    let ere = {
      "Nombre": this.name,
      "Precio": this.price,
      "Tipo": this.type,
      "Frecuencia": this.frecuency
    }

    this.http.post(`${URL_SERVICIOS}/planc`, ere)
    .subscribe(
      data => {
       console.log(data)
       swal(':)', 'Plan creado con éxito', 'success');
      },
      error => {
       console.log(error)
       swal('¡Error! :(', 'Inténtelo de nuevo', 'error');
      }
    );
  }
}
