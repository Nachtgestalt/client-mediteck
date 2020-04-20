import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';

@Component({
  selector: 'app-send-to-urgencies',
  templateUrl: './send-to-urgencies.component.html',
  styleUrls: ['./send-to-urgencies.component.css']
})
export class SendToUrgenciesComponent implements OnInit {
  @Input() id: any;
  motivo: String = '';
  prioridad: String = '';

  private modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, public http: HttpClient) {
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  urgencies() {
    let idMedCenter = localStorage.getItem('idMedicalCenter');

    let data = {
      'Motivo': this.motivo,
      'Prioridad': this.prioridad,
      'idPaciente': this.id,
      'idCentro_medico': idMedCenter
    };

    //console.log(this.motivo, this.prioridad);

    this.http.post(`${URL_SERVICIOS}/urgencias`, data)
      .subscribe(data => {
        console.log(data);
        this.modalRef.close();
      });
  }

  ngOnInit() {
  }

}
