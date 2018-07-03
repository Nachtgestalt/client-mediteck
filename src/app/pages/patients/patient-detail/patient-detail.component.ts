import {Component, OnInit} from '@angular/core';
import {PatientService} from '../../../services/patient/patient.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patient: any;
  id;

  constructor(private _patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {
        this.id = parametros['id'];
        this.loadData(this.id);

      });
  }

  ngOnInit() {

  }

  reload(cerrado) {
    if (cerrado) {
      this.loadData(this.id);
    }
  }

  loadData(id){
    this._patientService.getPatient(id)
      .subscribe(
        res => {
          this.patient = res;
          console.log(res);
        }
      );
  }

}
