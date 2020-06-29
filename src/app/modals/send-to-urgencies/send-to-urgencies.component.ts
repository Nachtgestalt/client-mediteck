import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-send-to-urgencies',
  templateUrl: './send-to-urgencies.component.html',
  styleUrls: ['./send-to-urgencies.component.css']
})
export class SendToUrgenciesComponent implements OnInit {
  @Input() id: any;
  urgencyForm: FormGroup;

  public modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, public http: HttpClient) {
  }

  open(content) {
    this.createForm();
    this.modalRef = this.modalService.open(content);
  }

  urgencies() {
    const idMedCenter = localStorage.getItem('idMedicalCenter');

    if (this.urgencyForm.invalid) {
      return;
    }

    const data = {
      'Motivo': this.urgencyForm.get('motivo').value,
      'Prioridad': this.urgencyForm.get('prioridad').value,
      'idPaciente': this.id,
      'idCentro_medico': idMedCenter
    };

    this.http.post(`${URL_SERVICIOS}/urgencias`, data)
      .subscribe(
        (res: any) => {
          this.modalRef.close();
          swal('Éxito', 'El paciente ha sido registrado en urgencias', 'success');
        },
        ({error}) => {
          const {code} = error;
          if (code === 409) {
            swal('Algo malo ha ocurrido', error.error, 'error');
          } else {
            swal('Algo malo ha ocurrido', 'Error al agregar paciente', 'error');
          }
        }
      );
  }

  ngOnInit() {
  }

  createForm() {
    this.urgencyForm = new FormGroup({
      'prioridad': new FormControl(null, Validators.required),
      'motivo': new FormControl('', Validators.required)
    });
  }
}
