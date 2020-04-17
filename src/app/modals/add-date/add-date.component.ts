import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-date',
  templateUrl: './add-date.component.html',
  styleUrls: ['./add-date.component.css']
})
export class AddDateComponent implements OnInit {
  @Input() patient;
  form: FormGroup;

  private modalRef: NgbModalRef;

  summary: string;
  location: string;
  start_dateTime: any;
  end_dateTime: any;

  constructor(private modalService: NgbModal,
              public http: HttpClient,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.initFormGroup();
  }

  initFormGroup() {
    this.form = new FormGroup({
      'Paciente': new FormControl(`${this.patient.Nombre} ${this.patient.Apellidos}`),
      'Lugar': new FormControl(),
      'Descripcion': new FormControl(),
      'Fecha_inicio': new FormControl(new Date().toISOString(), Validators.required),
      'Fecha_fin': new FormControl(new Date().toISOString(), Validators.required)
    });
  }

  open(content) {
    this.modalRef = this.modalService.open(content);
  }

  addDate() {
    console.log(this.form.value);
    this.authService.insertEvent(this.form.value).then(
      resp => {
        console.log(resp);
        // this.dialogRef.close();
      }
    );
  }
}
