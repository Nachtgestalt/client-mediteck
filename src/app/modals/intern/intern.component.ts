import { Component, OnInit, Input} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.css']
})
export class InternComponent implements OnInit {

  private modalRef: NgbModalRef;
  @Input() id: any;
  indicaciones: string = "";
  medicamentos: string = "";
  ingresar: Observable<any>;

  constructor(private modalService: NgbModal, public http: HttpClient){}

  ngOnInit() { }
  
  open(content){
    this.modalRef = this.modalService.open(content);
  }

  internar(){
    let info = {
        idPaciente: this.id,     
        medicamento: this.medicamentos,
        indicaciones: this.indicaciones
    }

    console.log(info);
    
    this.http.post(`${URL_SERVICIOS}/ingreso`, info)
    .subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

}
