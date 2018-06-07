import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DoctorService} from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {
  doctores: any = []


  constructor(public router: Router,
              public _doctorService: DoctorService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._doctorService.getDoctors()
      .subscribe(
        res => {
          console.log(res);
          this.doctores = res;
        }
      );
  }

  reload(cerrado) {
    if (cerrado) {
      this.loadData();
    }
  }
}
