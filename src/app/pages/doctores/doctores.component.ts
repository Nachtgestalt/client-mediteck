import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-doctores',
  templateUrl: './doctores.component.html',
  styleUrls: ['./doctores.component.css']
})
export class DoctoresComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToAddDoctor() {
    this.router.navigateByUrl('/user');
  }
}
