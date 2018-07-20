import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.css']
})
export class SurgeryComponent implements OnInit {

  formIndicaciones: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

  createFormGroup() {
    this.formIndicaciones = new FormGroup({
      'Dieta': new FormControl('', Validators.required),
      'Esquema_soluciones': new FormControl(''),
      'Lista_medicamentos': new FormControl(''),
      'Medias_generales': new FormControl(''),
      'Hemocomponentes': new FormControl(''),
    });
  }

}
