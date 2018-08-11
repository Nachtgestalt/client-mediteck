import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';
import { URL_SERVICIOS, CONEKTA_PUBLIC_KEY } from '../../config/config';

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent implements OnInit {
  @Input() name:string;
  @Input() price:string;

  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, public http:HttpClient){

  }

  open(content){
    this.modalRef = this.modalService.open(content);
  }

  ngOnInit(){}

  update(){
    let au = {
      "Key":CONEKTA_PUBLIC_KEY,
      "Nombre":this.name,
      "Precio":this.price
    }

    console.log(au);
    
    this.http.post(`${URL_SERVICIOS}/urgencias`, au)
    .subscribe(
      data => {
        console.log(data);
        swal(':)', 'Plan actualizado con éxito', 'success');
      },
      error => {
        console.log(error);
        swal('¡Error! :(', 'Inténtelo de nuevo', 'error');
      }
    );
  }
}
