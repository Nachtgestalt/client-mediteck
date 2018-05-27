import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-beds-xroom',
  templateUrl: './beds-xroom.component.html',
  styleUrls: ['./beds-xroom.component.css']
})
export class BedsXroomComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.createForm();
  }

  createForm (){
    this.form = new FormGroup({
      'Piso': new FormControl(),
      'Seccion': new FormControl(),
      'Descripcion': new FormControl(),
    });
  }

}
