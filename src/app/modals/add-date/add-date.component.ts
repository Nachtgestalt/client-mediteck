import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-add-date',
  templateUrl: './add-date.component.html',
  styleUrls: ['./add-date.component.css']
})
export class AddDateComponent implements OnInit, OnDestroy {
  @Input() patient;
  form: FormGroup;

  private modalRef: NgbModalRef;

  summary: string;
  location: string;
  start_dateTime: any;
  end_dateTime: any;
  userFirebase: Subscription;

  constructor(private modalService: NgbModal,
              public http: HttpClient,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.initFormGroup();
  }

  ngOnDestroy(): void {
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
    this.userFirebase = this.authService.userFirebase$.
      pipe(take(1))
      .subscribe(
      e => {
        if (!e) {
          console.log(e);
          this.authService.login().then(() => this.modalRef = this.modalService.open(content));
        } else {
          this.modalRef = this.modalService.open(content);
        }
      }
    );
  }

  addDate() {
    console.log(this.form.value);
    this.authService.insertEvent(this.form.value).then(
      resp => {
        console.log(resp);
        this.modalRef.close();
      }
    );
  }
}
